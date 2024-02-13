const glazingOptions = [
    { name: "Keep original", price: 0.00 },
    { name: "Sugar milk", price: 0.00 },
    { name: "Vanilla milk", price: 0.50 },
    { name: "Double chocolate", price: 1.50 }
];

const packSizeOptions = [
    { name: "1", price: 1 },
    { name: "3", price: 3 },
    { name: "6", price: 5 },
    { name: "12", price: 10 }
];


function populateDropdown(dropdown, options) {
    for (let i = 0; i < dropdown.options.length; i++) {
        const option = dropdown.options[i];
        const matchingOption = options.find(opt => opt.name === option.value);
        if (matchingOption) {
            option.dataset.price = matchingOption.price.toFixed(2);
        }
    }
}

const glazingDropdown = document.getElementById("glazingOptions");
const packSizeDropdown = document.getElementById("packSizeOptions");

populateDropdown(glazingDropdown, glazingOptions);
populateDropdown(packSizeDropdown, packSizeOptions);


function updatePrice() {
    const basePrice = 2.49;
    let glazingPrice = 0;
    let packPrice = 0;

    // Find the selected glazing option price
    for (let i = 0; i < glazingOptions.length; i++) {
        if (glazingDropdown.value === glazingOptions[i].name) {
            glazingPrice = glazingOptions[i].price;
            break;
        }
    }

    // Find the selected pack size option price
    for (let i = 0; i < packSizeOptions.length; i++) {
        if (packSizeDropdown.value === packSizeOptions[i].name) {
            packPrice = packSizeOptions[i].price;
            break;
        }
    }

    // Calculate total price
    const totalPrice = (basePrice + glazingPrice) * packPrice;

    // Update the price field
    const priceField = document.getElementById("price");
    priceField.textContent = `$${totalPrice.toFixed(2)}`;
}


glazingDropdown.addEventListener("change", updatePrice);


packSizeDropdown.addEventListener("change", updatePrice);


updatePrice();