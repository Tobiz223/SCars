function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        console.error('Toast container not found!');
        return;
    }

    const toastClass = type === 'success' ? 'text-bg-success' : 'text-bg-danger';

    const toastHtml = `
        <div class="toast align-items-center ${toastClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastEl, { delay: 5000 }); 
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
    return localStorage.getItem('currentUserEmail');
}

function setCurrentUser(email) {
    if (email) {
        localStorage.setItem('currentUserEmail', email);
    } else {
        localStorage.removeItem('currentUserEmail');
    }
    updateLoginButton();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function registerUser(email, password) {
    const registerMessage = document.getElementById('registerMessage');
    if (!registerMessage) return false;

    if (!isValidEmail(email)) {
        registerMessage.textContent = 'Пожалуйста, введите корректный email.';
        registerMessage.className = 'text-danger mt-2';
        return false;
    }
    if (password.length < 6) {
        registerMessage.textContent = 'Пароль должен быть не менее 6 символов.';
        registerMessage.className = 'text-danger mt-2';
        return false;
    }

    const users = getUsers();
    if (users[email]) {
        registerMessage.textContent = 'Пользователь с таким email уже существует.';
        registerMessage.className = 'text-danger mt-2';
        return false;
    }
    users[email] = password;
    saveUsers(users);
    registerMessage.textContent = 'Вы успешно зарегистрировались!';
    registerMessage.className = 'text-success mt-2';
    setTimeout(() => {
        registerMessage.textContent = '';
    }, 3000);
    return true;
}

function loginUser(email, password) {
    const loginMessage = document.getElementById('loginMessage');
    if (!loginMessage) return false;

    if (!isValidEmail(email)) {
        loginMessage.textContent = 'Пожалуйста, введите корректный email.';
        loginMessage.className = 'text-danger mt-2';
        return false;
    }

    const users = getUsers();
    if (users[email] && users[email] === password) {
        setCurrentUser(email);
        loginMessage.textContent = 'Вы успешно вошли!';
        loginMessage.className = 'text-success mt-2';
        setTimeout(() => {
            loginMessage.textContent = '';
        }, 3000);
        showToast(`Добро пожаловать, ${email.split('@')[0]}!`);
        return true;
    } else {
        loginMessage.textContent = 'Неверный email или пароль.';
        loginMessage.className = 'text-danger mt-2';
        return false;
    }
}

function logoutUser() {
    setCurrentUser(null);
    showToast('Вы вышли из системы.');
    const profileModalElement = document.getElementById('profileModal');
    if (profileModalElement) {
        const profileModal = bootstrap.Modal.getInstance(profileModalElement);
        if (profileModal) profileModal.hide();
    }
}

function updateLoginButton() {
    const loginBtn = document.getElementById('mainLoginBtn');
    if (!loginBtn) return;

    const currentUser = getCurrentUser();
    if (currentUser) {
        loginBtn.textContent = `Привет, ${currentUser.split('@')[0]}`; 
        loginBtn.removeEventListener('click', showAuthModal); 
        loginBtn.addEventListener('click', showProfileModal); 
    } else {
        loginBtn.textContent = 'Log in';
        loginBtn.removeEventListener('click', showProfileModal); 
        loginBtn.addEventListener('click', showAuthModal);
    }
}


function createAuthModal() {
    const existingModal = document.getElementById('authModal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
        <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="authModalLabel">Вход / Регистрация</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs mb-3" id="authTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Вход</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">Регистрация</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="authTabsContent">
                            <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                                <div class="mb-3">
                                    <label for="loginEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control bg-secondary text-white border-0" id="loginEmail">
                                </div>
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Пароль</label>
                                    <input type="password" class="form-control bg-secondary text-white border-0" id="loginPassword">
                                </div>
                                <button type="button" class="btn btn-warning w-100" id="doLoginBtn">Войти</button>
                                <div id="loginMessage" class="mt-2 text-center"></div>
                            </div>
                            <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                                <div class="mb-3">
                                    <label for="registerEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control bg-secondary text-white border-0" id="registerEmail">
                                </div>
                                <div class="mb-3">
                                    <label for="registerPassword" class="form-label">Пароль</label>
                                    <input type="password" class="form-control bg-secondary text-white border-0" id="registerPassword">
                                </div>
                                <button type="button" class="btn btn-warning w-100" id="doRegisterBtn">Зарегистрироваться</button>
                                <div id="registerMessage" class="mt-2 text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('doLoginBtn').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (loginUser(email, password)) {
            bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
        }
    });

    document.getElementById('doRegisterBtn').addEventListener('click', () => {
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        if (registerUser(email, password)) {
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
            const loginTabTrigger = document.querySelector('#authTabs button[data-bs-target="#login"]');
            if (loginTabTrigger) {
                bootstrap.Tab.getInstance(loginTabTrigger).show();
            }
            setTimeout(() => {
                const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
                if (authModal) authModal.hide();
                showProfileModal();
            }, 500);
        }
    });
}

function showAuthModal() {
    createAuthModal();
    const authModalElement = document.getElementById('authModal');
    const authModal = new bootstrap.Modal(authModalElement);
    authModal.show();
}

function createProfileModal() {
    const existingModal = document.getElementById('profileModal');
    if (existingModal) existingModal.remove();

    const currentUserEmail = getCurrentUser();
    const modalHtml = `
        <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="profileModalLabel">Личный кабинет</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-pills mb-3" id="profileTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="my-bookings-tab" data-bs-toggle="tab" data-bs-target="#my-bookings" type="button" role="tab" aria-controls="my-bookings" aria-selected="true">Мои бронирования</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="my-data-tab" data-bs-toggle="tab" data-bs-target="#my-data" type="button" role="tab" aria-controls="my-data" aria-selected="false">Мои данные</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Настройки</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">История поездок</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="profileTabsContent">
                            <div class="tab-pane fade show active" id="my-bookings" role="tabpanel" aria-labelledby="my-bookings-tab">
                                <p class="text-white mb-3">Текущий пользователь: <strong>${currentUserEmail || 'Не авторизован'}</strong></p>
                                <h6 class="text-white mb-3">Ваши забронированные автомобили:</h6>
                                <div id="userBookingsList" class="list-group">
                                </div>
                            </div>
                            <div class="tab-pane fade" id="my-data" role="tabpanel" aria-labelledby="my-data-tab">
                                <p class="text-white">Здесь будут ваши личные данные. (Заглушка)</p>
                            </div>
                            <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                <p class="text-white">Здесь будут настройки профиля. (Заглушка)</p>
                            </div>
                            <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                                <p class="text-white">Здесь будет история ваших прошлых бронирований. (Заглушка)</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                        <button type="button" class="btn btn-danger" id="doLogoutBtn">Выйти</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('doLogoutBtn').addEventListener('click', logoutUser);

    document.getElementById('profileModal').addEventListener('shown.bs.tab', function(event) {
        if (event.target.id === 'my-bookings-tab') {
            displayUserBookings();
        }
    });
}

function showProfileModal() {
    createProfileModal();
    const profileModalElement = document.getElementById('profileModal');
    const profileModal = new bootstrap.Modal(profileModalElement);
    profileModal.show();
    displayUserBookings();
}

function displayUserBookings() {
    const userBookingsList = document.getElementById('userBookingsList');
    if (!userBookingsList) return;

    userBookingsList.innerHTML = '';

    const currentUserEmail = getCurrentUser();
    if (!currentUserEmail) {
        userBookingsList.innerHTML = '<p class="text-muted">Вы не вошли в систему.</p>';
        return;
    }

    const bookings = getBookings().filter(booking => booking.userEmail === currentUserEmail);

    if (bookings.length === 0) {
        userBookingsList.innerHTML = '<p class="text-muted">У вас нет активных бронирований.</p>';
        return;
    }

    bookings.forEach(booking => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item', 'bg-dark', 'text-white', 'border-secondary', 'mb-2');
        listItem.innerHTML = `
            <strong>${booking.brand} ${booking.model}</strong><br>
            <small>С: ${booking.startDate} По: ${booking.endDate}</small><br>
            <small>Стоимость: ${booking.totalPrice}$</small>
        `;
        userBookingsList.appendChild(listItem);
    });
}

function displayUserBookings() {
    const userBookingsList = document.getElementById('userBookingsList');
    if (!userBookingsList) return;

    userBookingsList.innerHTML = '';

    const currentUserEmail = getCurrentUser();
    if (!currentUserEmail) {
        userBookingsList.innerHTML = '<p class="text-muted">Вы не вошли в систему.</p>';
        return;
    }

    const bookings = getBookings().filter(booking => booking.userEmail === currentUserEmail);

    if (bookings.length === 0) {
        userBookingsList.innerHTML = '<p class="text-muted">У вас нет активных бронирований.</p>';
        return;
    }

    bookings.forEach(booking => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item', 'bg-dark', 'text-white', 'border-secondary', 'mb-2');
        listItem.innerHTML = `
            <strong>${booking.brand} ${booking.model}</strong><br>
            <small>С: ${booking.startDate} По: ${booking.endDate}</small><br>
            <small>Стоимость: ${booking.totalPrice}$</small>
        `;
        userBookingsList.appendChild(listItem);
    });
}

function createAuthModal() {
    const existingModal = document.getElementById('authModal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
        <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="authModalLabel">Вход / Регистрация</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs mb-3" id="authTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Вход</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">Регистрация</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="authTabsContent">
                            <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                                <div class="mb-3">
                                    <label for="loginEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control bg-secondary text-white border-0" id="loginEmail">
                                </div>
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Пароль</label>
                                    <input type="password" class="form-control bg-secondary text-white border-0" id="loginPassword">
                                </div>
                                <button type="button" class="btn btn-warning w-100" id="doLoginBtn">Войти</button>
                                <div id="loginMessage" class="mt-2 text-center"></div>
                            </div>
                            <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                                <div class="mb-3">
                                    <label for="registerEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control bg-secondary text-white border-0" id="registerEmail">
                                </div>
                                <div class="mb-3">
                                    <label for="registerPassword" class="form-label">Пароль</label>
                                    <input type="password" class="form-control bg-secondary text-white border-0" id="registerPassword">
                                </div>
                                <button type="button" class="btn btn-warning w-100" id="doRegisterBtn">Зарегистрироваться</button>
                                <div id="registerMessage" class="mt-2 text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('doLoginBtn').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (loginUser(email, password)) {
            bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
        }
    });

    document.getElementById('doRegisterBtn').addEventListener('click', () => {
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        if (registerUser(email, password)) {
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
            const loginTabTrigger = document.querySelector('#authTabs button[data-bs-target="#login"]');
            if (loginTabTrigger) {
                bootstrap.Tab.getInstance(loginTabTrigger).show();
            }
            setTimeout(() => {
                const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
                if (authModal) authModal.hide();
                showProfileModal();
            }, 500);
        }
    });
}

function showAuthModal() {
    createAuthModal();
    const authModalElement = document.getElementById('authModal');
    const authModal = new bootstrap.Modal(authModalElement);
    authModal.show();
}

function createProfileModal() {
    const existingModal = document.getElementById('profileModal');
    if (existingModal) existingModal.remove();

    const currentUserEmail = getCurrentUser();
    const modalHtml = `
        <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="profileModalLabel">Личный кабинет</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-pills mb-3" id="profileTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="my-bookings-tab" data-bs-toggle="tab" data-bs-target="#my-bookings" type="button" role="tab" aria-controls="my-bookings" aria-selected="true">Мои бронирования</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="my-data-tab" data-bs-toggle="tab" data-bs-target="#my-data" type="button" role="tab" aria-controls="my-data" aria-selected="false">Мои данные</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Настройки</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">История поездок</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="profileTabsContent">
                            <div class="tab-pane fade show active" id="my-bookings" role="tabpanel" aria-labelledby="my-bookings-tab">
                                <p class="text-white mb-3">Текущий пользователь: <strong>${currentUserEmail || 'Не авторизован'}</strong></p>
                                <h6 class="text-white mb-3">Ваши забронированные автомобили:</h6>
                                <div id="userBookingsList" class="list-group">
                                </div>
                            </div>
                            <div class="tab-pane fade" id="my-data" role="tabpanel" aria-labelledby="my-data-tab">
                                <p class="text-white">Здесь будут ваши личные данные. (Заглушка)</p>
                            </div>
                            <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                <p class="text-white">Здесь будут настройки профиля. (Заглушка)</p>
                            </div>
                            <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                                <p class="text-white">Здесь будет история ваших прошлых бронирований. (Заглушка)</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                        <button type="button" class="btn btn-danger" id="doLogoutBtn">Выйти</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('doLogoutBtn').addEventListener('click', logoutUser);

    document.getElementById('profileModal').addEventListener('shown.bs.tab', function(event) {
        if (event.target.id === 'my-bookings-tab') {
            displayUserBookings();
        }
    });
}

function showProfileModal() {
    createProfileModal();
    const profileModalElement = document.getElementById('profileModal');
    const profileModal = new bootstrap.Modal(profileModalElement);
    profileModal.show();
    displayUserBookings();
}

let currentCarIndexToBook = null;

