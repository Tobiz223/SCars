const data = [
    {
        brand: "BMW",
        model: "X5",
        image: "img/img2.png",
        price: "20000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "A4",
        image: "img/Audi A4.png",
        price: "18000$",
        ishere: "Свободна"
    },
    {
        brand: "Toyota",
        model: "Camry",
        image: "img/Toyota Camry.png",
        price: "22000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "Q8",
        image: "img/Audi Q8.png",
        price: "35000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "S5",
        image: "img/Audi S5.png",
        price: "28000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "3 Series",
        image: "img/BMW 3 Series.png",
        price: "17000$",
        ishere: "Свободна"
    },
    {
        brand: "Toyota",
        model: "Corolla",
        image: "img/Toyota Corolla.png",
        price: "15000$",
        ishere: "Свободна"
    },
    {
        brand: "Mercedes-Benz",
        model: "C-Class",
        image: "img/Mercedes C-Class.png",
        price: "25000$",
        ishere: "Свободна"
    },
    {
        brand: "Mercedes-Benz",
        model: "E-Class",
        image: "img/Mercedes E-Class.png",
        price: "32000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "Z4 sDrive20i Roadster",
        image: "img/BMW Z4 sDrive20i Roadster.png",
        price: "30000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "530e Touring",
        image: "img/BMW 530e Touring.png",
        price: "27000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "i7 xDrive60",
        image: "img/BMW i7 xDrive60.png",
        price: "45000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "M5 Touring",
        image: "img/BMW M5 Touring.png",
        price: "40000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "X3 M50 xDrive",
        image: "img/BMW X3 M50 xDrive.png",
        price: "33000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "840i",
        image: "img/840i.png",
        price: "38000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "M850i xDrive",
        image: "img/M850i xDrive.png",
        price: "42000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "iX",
        image: "img/BMW iX.png",
        price: "36000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "XM 50e",
        image: "img/XM 50e.png",
        price: "48000$",
        ishere: "Свободна"
    },
    {
        brand: "BMW",
        model: "M4",
        image: "img/M4.png",
        price: "39000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "Q6 Sportback e-tron",
        image: "img/Audi Q6 Sportback e-tron.png",
        price: "37000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "Q6 e-tron",
        image: "img/Audi Q6 e-tron.png",
        price: "36000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "A3 Sedan",
        image: "img/Audi A3 Sedan.png",
        price: "21000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "A8 TFSI e",
        image: "img/Audi A8 TFSI e.png",
        price: "44000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "RS 3 Sportback",
        image: "img/Audi RS 3 Sportback.png",
        price: "31000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "A7 Sportback TFSI e",
        image: "img/Audi A7 Sportback TFSI e.png",
        price: "39000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "A8 L TFSI e",
        image: "img/Audi A8 L TFSI e.png",
        price: "46000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "Q4 Sportback e-tron",
        image: "img/Audi Q4 Sportback e-tron.png",
        price: "34000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "A5 Sedan e-hybrid",
        image: "img/Audi A5 Sedan e-hybrid.png",
        price: "29000$",
        ishere: "Свободна"
    },
    {
        brand: "Audi",
        model: "A6 Sedan TFSI e",
        image: "img/Audi A6 Sedan TFSI e.png",
        price: "35000$",
        ishere: "Свободна"
    },
    {
        brand: "Lexus",
        model: "LC500 CABRIO",
        image: "img/Lexus LC500 CABRIO.jpeg",
        price: "55000$",
        ishere: "Свободна"
    },
    {
        brand: "Lexus",
        model: "RX450h Plug-in",
        image: "img/Lexus RX450h Plug-in.jpg",
        price: "48000$",
        ishere: "Свободна"
    },
    {
        brand: "Lexus",
        model: "RX500h",
        image: "img/Lexus RX500h.jpg",
        price: "50000$",
        ishere: "Свободна"
    },
    {
        brand: "Lexus",
        model: "LM 350h",
        image: "img/Lexus LM 350h.jpg",
        price: "60000$",
        ishere: "Свободна"
    },
    {
        brand: "Lexus",
        model: "NX350",
        image: "img/Lexus NX350.jpg",
        price: "42000$",
        ishere: "Свободна"
    },
    {
        brand: "Lexus",
        model: "LC",
        image: "img/2018 Lexus LC Trims.jpg",
        price: "52000$",
        ishere: "Свободна"
    },
    {
        brand: "Hyundai",
        model: "KONA Hybrid",
        image: "img/All-new KONA Hybrid.jpg",
        price: "19000$",
        ishere: "Свободна"
    },
    {
        brand: "Hyundai",
        model: "SANTA FE Plug-in Hybrid",
        image: "img/All-new SANTA FE Plug-in Hybrid.jpg",
        price: "28000$",
        ishere: "Свободна"
    },
    {
        brand: "Hyundai",
        model: "BAYON",
        image: "img/BAYON.png",
        price: "16000$",
        ishere: "Свободна"
    },
    {
        brand: "Hyundai",
        model: "TUCSON Plug-in Hybrid",
        image: "img/TUCSON Plug-in Hybrid.jpg",
        price: "25000$",
        ishere: "Свободна"
    },
    {
        brand: "Hyundai",
        model: "IONIQ 5 N",
        image: "img/IONIQ 5 N.jpg",
        price: "32000$",
        ishere: "Свободна"
    },
    {
        brand: "Infiniti",
        model: "Q60",
        image: "img/q60.png",
        price: "30000$",
        ishere: "Свободна"
    },
    {
        brand: "Infiniti",
        model: "Q70",
        image: "img/download.jpg",
        price: "28000$",
        ishere: "Свободна"
    },
    {
        brand: "Infiniti",
        model: "QX80",
        image: "img/download (1).jpg",
        price: "35000$",
        ishere: "Свободна"
    },
    {
        brand: "Infiniti",
        model: "QX60",
        image: "img/download (2).jpg",
        price: "32000$",
        ishere: "Свободна"
    }
];

const priceRanges = [
    "Без ограничений",
    "до 10000$",
    "до 15000$",
    "до 20000$",
    "до 25000$",
    "до 30000$",
    "больше 30000$"
];

function getUniqueValues(arr, key) {
    return [...new Set(arr.map(item => item[key]))].sort();
}


function fillSelectOptions(selectId, options, selectedValue = "") {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = "";

    const anyOption = document.createElement("option");
    anyOption.textContent = "Любая";
    anyOption.value = "";
    select.appendChild(anyOption);

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
    });

    if (selectedValue) {
        select.value = selectedValue;
    } else {
        select.value = ""; 
    }
}

function createCard({ brand, model, image, price, ishere }) {
    const card = document.createElement("div");
    card.style.display = 'inline-flex';
    card.style.flexDirection = 'column';
    card.style.width = '300px';
    card.style.flexShrink = '0';
    card.style.verticalAlign = 'top'; 

    card.className = ''; 

    card.innerHTML = `
        <div class="card h-100 bg-dark text-white" style="width: 100%;">
            <div class="card-header">
                <h5 class="card-title text-center">
                    <span class="brand">${brand}</span> <span class="model">${model}</span>
                </h5>
            </div>
            <img src="${image}" alt="${brand} ${model}" class="card-img-top" style="object-fit: cover; height: 200px;" />
            <div class="card-body d-flex flex-column">
                <p class="card-text text-center fw-bold fs-4">${price} / день</p>
                <div class="mt-auto text-center">
                    <button class="btn btn-warning rent-btn me-2"
                        data-brand="${brand}"
                        data-model="${model}"
                        data-ishere="${ishere}"
                        data-index="${data.findIndex(car => car.brand === brand && car.model === model)}">Аренда</button>
                    <button class="btn ${ishere === 'Свободна' ? 'btn-success' : 'btn-danger'} details-btn">${ishere}</button>
                </div>
            </div>
        </div>
    `;
    return card;
}

function renderCards(filteredData) {
    const container = document.getElementById("cards-container");
    const searchResultsSection = document.getElementById("search-results-section");

    if (!container || !searchResultsSection) return;

    container.innerHTML = "";

    if (filteredData.length === 0) {
        container.innerHTML = '<p class="text-white text-center fs-4 mt-5">По вашим критериям автомобили не найдены.</p>';
        searchResultsSection.style.display = 'block';
    } else {
        filteredData.forEach(car => {
            const card = createCard(car);
            container.appendChild(card);
        });
        searchResultsSection.style.display = 'block';

        document.querySelectorAll('.rent-btn').forEach(button => {
            button.addEventListener('click', function() {
                const brand = this.dataset.brand;
                const model = this.dataset.model;
                const ishere = this.dataset.ishere;
                const index = this.dataset.index;
                showRentModal(brand, model, ishere, index);
            });
        });
    }
}

function filterCars(brand, model, price) {
    return data.filter(car => {
        const matchBrand = !brand || car.brand === brand;
        const matchModel = !model || car.model === model;

        let matchPrice = true;
        const numericPrice = parseInt(car.price.replace("$", ""));

        if (price && price !== "Без ограничений") {
            if (price === "до 10000$") matchPrice = numericPrice <= 10000;
            else if (price === "до 15000$") matchPrice = numericPrice <= 15000;
            else if (price === "до 20000$") matchPrice = numericPrice <= 20000;
            else if (price === "до 25000$") matchPrice = numericPrice <= 25000;
            else if (price === "до 30000$") matchPrice = numericPrice <= 30000;
            else if (price === "больше 30000$") matchPrice = numericPrice > 30000;
        }
        return matchBrand && matchModel && matchPrice;
    });
}
