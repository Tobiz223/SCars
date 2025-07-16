function getBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

function bookCar(carIndex, startDate, endDate) {
    const rentMessage = document.getElementById('rentMessage');
    if (!rentMessage) return false;

    const currentUser = getCurrentUser();
    if (!currentUser) {
        showToast('Пожалуйста, войдите, чтобы забронировать автомобиль.', 'danger');
        showAuthModal();
        rentMessage.textContent = 'Пожалуйста, войдите, чтобы забронировать автомобиль.';
        rentMessage.className = 'text-danger mt-2';
        return false;
    }

    if (data[carIndex].ishere === 'Занята') {
        showToast('Этот автомобиль уже занят.', 'danger');
        rentMessage.textContent = 'Этот автомобиль уже занят.';
        rentMessage.className = 'text-danger mt-2';
        return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (start < today) {
        showToast('Дата начала аренды не может быть в прошлом.', 'danger');
        rentMessage.textContent = 'Дата начала аренды не может быть в прошлом.';
        rentMessage.className = 'text-danger mt-2';
        return false;
    }

    if (start >= end) {
        showToast('Дата окончания аренды должна быть позже даты начала.', 'danger');
        rentMessage.textContent = 'Дата окончания аренды должна быть позже даты начала.';
        rentMessage.className = 'text-danger mt-2';
        return false;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const pricePerDay = parseInt(data[carIndex].price.replace("$", ""));
    const totalPrice = pricePerDay * diffDays;

    const booking = {
        userEmail: currentUser,
        brand: data[carIndex].brand,
        model: data[carIndex].model,
        startDate: startDate,
        endDate: endDate,
        totalPrice: totalPrice, 
        carIndex: carIndex 
    };

    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);

    data[carIndex].ishere = 'Занята';
    applyFiltersAndRender(); 
    showToast(`Автомобиль ${data[carIndex].brand} ${data[carIndex].model} забронирован вами.`);

    rentMessage.textContent = `Автомобиль успешно забронирован! Стоимость: ${totalPrice}$`;
    rentMessage.className = 'text-success mt-2';
    setTimeout(() => {
        rentMessage.textContent = '';
    }, 3000);

    return true;
}


function createRentModal() {
    const modalHtml = `
        <div class="modal fade" id="rentModal" tabindex="-1" aria-labelledby="rentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="rentModalLabel">Аренда автомобиля</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Вы выбрали: <strong id="modalCarInfo"></strong></p>
                        <p>Статус: <strong id="modalCarStatus"></strong></p>
                        <div class="mb-3">
                            <label for="startDate" class="form-label">Дата начала аренды:</label>
                            <input type="date" class="form-control bg-secondary text-white border-0" id="startDate">
                        </div>
                        <div class="mb-3">
                            <label for="endDate" class="form-label">Дата окончания аренды:</label>
                            <input type="date" class="form-control bg-secondary text-white border-0" id="endDate">
                        </div>
                        <p class="text-center">Примерная стоимость: <strong id="estimatedPrice">0$</strong></p>
                        <div id="rentMessage" class="mt-2 text-center"></div>
                    </div>
                    <div class="modal-footer border-top-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                        <button type="button" class="btn btn-warning" id="confirmRentBtn">Подтвердить аренду</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const estimatedPriceElement = document.getElementById('estimatedPrice');

    function updateEstimatedPrice() {
        const start = startDateInput.value;
        const end = endDateInput.value;
        if (start && end && currentCarIndexToBook !== null) {
            const startDateObj = new Date(start);
            const endDateObj = new Date(end);
            const pricePerDay = parseInt(data[currentCarIndexToBook].price.replace("$", ""));

            if (startDateObj < endDateObj) {
                const diffTime = Math.abs(endDateObj - startDateObj);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                estimatedPriceElement.textContent = `${pricePerDay * diffDays}$`;
            } else {
                estimatedPriceElement.textContent = 'Некорректные даты';
            }
        } else {
            estimatedPriceElement.textContent = '0$';
        }
    }

    startDateInput.addEventListener('change', updateEstimatedPrice);
    endDateInput.addEventListener('change', updateEstimatedPrice);

    document.getElementById('confirmRentBtn').addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (currentCarIndexToBook !== null) {
            if (bookCar(currentCarIndexToBook, startDate, endDate)) {
            }
        }
    });
}

function showRentModal(brand, model, ishere, index) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showToast('Пожалуйста, войдите, чтобы забронировать автомобиль.', 'danger');
        showAuthModal();
        return;
    }

    currentCarIndexToBook = index;

    let rentModalElement = document.getElementById('rentModal');
    if (!rentModalElement) {
        createRentModal();
        rentModalElement = document.getElementById('rentModal');
    }

    const modal = new bootstrap.Modal(rentModalElement);
    const modalCarInfo = document.getElementById('modalCarInfo');
    const modalCarStatus = document.getElementById('modalCarStatus');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const estimatedPriceElement = document.getElementById('estimatedPrice');
    const rentMessage = document.getElementById('rentMessage');

    if (modalCarInfo) {
        modalCarInfo.textContent = `${brand} ${model}`;
    }
    if (modalCarStatus) {
        modalCarStatus.textContent = ishere;
        if (ishere === 'Свободна') {
            modalCarStatus.style.color = 'lightgreen';
        } else if (ishere === 'Занята') {
            modalCarStatus.style.color = 'salmon';
        } else {
            modalCarStatus.style.color = 'white';
        }
    }

    startDateInput.value = '';
    endDateInput.value = '';
    estimatedPriceElement.textContent = '0$';
    rentMessage.textContent = '';

    const confirmRentBtn = document.getElementById('confirmRentBtn');
    if (ishere === 'Занята') {
        confirmRentBtn.disabled = true;
        startDateInput.disabled = true;
        endDateInput.disabled = true;
        showToast('Этот автомобиль недоступен для бронирования.', 'danger');
        rentMessage.textContent = 'Этот автомобиль недоступен для бронирования.';
        rentMessage.className = 'text-danger mt-2';
    } else {
        confirmRentBtn.disabled = false;
        startDateInput.disabled = false;
        endDateInput.disabled = false;
    }

    modal.show();
}