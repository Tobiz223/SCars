window.addEventListener("DOMContentLoaded", () => {
    const isInputPage = window.location.pathname.includes("input.html") || window.location.pathname === "/";

    const brandSelect = document.getElementById("brandSelect");
    const modelSelect = document.getElementById("modelSelect");
    const priceSelect = document.getElementById("priceSelect");
    const searchBtn = document.getElementById("searchBtn");
    const searchResultsSection = document.getElementById("search-results-section");

    createAuthModal();
    createProfileModal();
    updateLoginButton();

    if (brandSelect) fillSelectOptions("brandSelect", getUniqueValues(data, "brand"));
    if (priceSelect) fillSelectOptions("priceSelect", priceRanges);

    const updateModelSelect = (selectedBrand, selectedModel = "") => {
        let modelsToDisplay = [];
        if (selectedBrand === "") {
            modelsToDisplay = getUniqueValues(data, "model");
        } else {
            modelsToDisplay = data.filter(car => car.brand === selectedBrand).map(car => car.model);
            modelsToDisplay = [...new Set(modelsToDisplay)];
        }
        fillSelectOptions("modelSelect", modelsToDisplay, selectedModel);
    };

    const applyFiltersAndRender = () => {
        const brand = brandSelect ? brandSelect.value : '';
        const model = modelSelect ? modelSelect.value : '';
        const price = priceSelect ? priceSelect.value : '';

        localStorage.setItem("selectedBrand", brand);
        localStorage.setItem("selectedModel", model);
        localStorage.setItem("selectedPrice", price);

        const filteredCars = filterCars(brand, model, price);
        renderCards(filteredCars);
    };

    if (isInputPage) {
        if (searchResultsSection) searchResultsSection.style.display = 'none';

        const savedBrand = localStorage.getItem("selectedBrand");
        const savedModel = localStorage.getItem("selectedModel");
        const savedPrice = localStorage.getItem("selectedPrice");

        if (brandSelect) {
            brandSelect.value = savedBrand || "";
            updateModelSelect(brandSelect.value, savedModel || "");
        }
        if (priceSelect) {
            priceSelect.value = savedPrice || "";
        }

        if (brandSelect) {
            brandSelect.addEventListener("change", function () {
                updateModelSelect(this.value);
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener("click", function () {
                localStorage.setItem("selectedBrand", brandSelect.value);
                localStorage.setItem("selectedModel", modelSelect.value);
                localStorage.setItem("selectedPrice", priceSelect.value);
                window.location.href = "cars.html";
            });
        }

    } else if (window.location.pathname.includes("cars.html")) {
        createRentModal();

        if (searchResultsSection) searchResultsSection.style.display = 'none';

        const savedBrand = localStorage.getItem("selectedBrand");
        const savedModel = localStorage.getItem("selectedModel");
        const savedPrice = localStorage.getItem("selectedPrice");

        if (brandSelect) {
            brandSelect.value = savedBrand || "";
            updateModelSelect(brandSelect.value, savedModel || "");
        }
        if (priceSelect) {
            priceSelect.value = savedPrice || "";
        }

        if (brandSelect) brandSelect.addEventListener("change", function() {
            updateModelSelect(this.value);
            applyFiltersAndRender();
        });
        if (modelSelect) modelSelect.addEventListener("change", applyFiltersAndRender);
        if (priceSelect) priceSelect.addEventListener("change", applyFiltersAndRender);

        if (searchBtn) {
            searchBtn.classList.add("filter-action-btn");
            searchBtn.addEventListener("click", applyFiltersAndRender);
        }

        if (savedBrand || savedModel || savedPrice) {
            applyFiltersAndRender();
        } else {
            renderCards(data);
        }
    }
});
