const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

function updateProductImage() {
    var rollType = getUrlParameter('roll');
    var imageFile = rolls[rollType].imageFile;
    document.getElementById('product-image').src = "../assets/products/" + imageFile;
}

// Function to retrieve URL parameters
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Call the function to update the product image when the page loads
window.onload = function() {
    updateProductImage();
};


const cart = [];

// Parse the URL parameter to get the current roll type
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

// Function to update DOM elements with roll information
function updateRollDetails() {
    // Get the roll information from the rolls dictionary
    const rollInfo = rolls[rollType];

    // Update the heading with the roll type
    document.getElementById('roll-heading').innerText = rollType + ' Cinnamon Roll';

    // Update the image source with the correct roll image path
    document.getElementById('product-image').src = '../assets/products/' + rollInfo.imageFile;
}

// Function to calculate total price based on glazing and pack size selection
function updateTotalPrice() {
    // Get selected glazing and pack size options
    const selectedGlazing = document.getElementById('glazingOptions').value;
    
    const selectedPackSize = document.getElementById('packSizeOptions').value;

    // Get the roll information from the rolls dictionary
    const rollInfo = rolls[rollType];



    // Calculate total price based on base price, glazing, and pack size
    const basePrice = rollInfo.basePrice;

    console.log(basePrice);

    let glazingPrice = 0;
    let packPrice = 0;

    // Find the selected glazing option price
    for (let i = 0; i < glazingOptions.length; i++) {
        if (selectedGlazing === glazingOptions[i].name) {
            glazingPrice = glazingOptions[i].price;
            break;
        }
    }

    // Find the selected pack size option price
    for (let i = 0; i < packSizeOptions.length; i++) {
        if (selectedPackSize === packSizeOptions[i].name) {
            packPrice = packSizeOptions[i].price;
            break;
        }
    }

    // Calculate total price
    const totalPrice = (basePrice + glazingPrice) * packPrice;

    // Update the total price field
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;

  
}

// Call updateRollDetails function to update DOM elements with roll information
updateRollDetails();

// Add event listeners to glazing and pack size dropdown menus to update total price
document.getElementById('glazingOptions').addEventListener('change', updateTotalPrice);
document.getElementById('packSizeOptions').addEventListener('change', updateTotalPrice);
