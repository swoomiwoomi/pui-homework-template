// creating the empty cart
let cart = [];


//reusing the same dictionary with the glazing names and prices
const glazingOptions = [
    { name: "Keep original", price: 0.00 },
    { name: "Sugar milk", price: 0.00 },
    { name: "Vanilla milk", price: 0.50 },
    { name: "Double chocolate", price: 1.50 }
];

//reusing the same dictionary with the pack sizes and prices
const packSizeOptions = [
    { name: "1", price: 1 },
    { name: "3", price: 3 },
    { name: "6", price: 5 },
    { name: "12", price: 10 }
];

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


//given class with added variable that represents the calculated price
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatedPrice = (((this.basePrice + glazingOptions.find(option => option.name === this.glazing).price) * packSizeOptions.find(option => option.name === this.size).price));
        this.rollImage = '../assets/products/' + rolls[this.type]['imageFile'];
    }
}

// Create instances of the Roll class for each roll and push them to the cart array
cart.push(new Roll("Original", "Sugar milk", "1", 2.49));
cart.push(new Roll("Walnut", "Vanilla milk", "12", 3.49));
cart.push(new Roll("Raisin", "Sugar milk", "3", 2.99));
cart.push(new Roll("Apple", "Keep original", "3", 3.49));

//printing the cart to make sure the instances are added
console.log("Cart:", cart);

let totalPrice = 0;

// Function to create a cart item element
function createCartItemElement(roll) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('cart-image-container');
    cartItem.appendChild(imageContainer);

    // Image
    const image = document.createElement('img');
    image.src = roll.rollImage;
    image.alt = roll.type + ' Cinnamon Roll';
    image.style.width = '200px'; // Set image width to 200px
    imageContainer.appendChild(image);

    // Information container
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('cart-info-container');
    cartItem.appendChild(infoContainer);

    // Roll name
    const rollName = document.createElement('p');
    rollName.textContent = roll.type + ' Cinnamon Roll';
    infoContainer.appendChild(rollName);

    // Glazing type
    const glazingType = document.createElement('p');
    glazingType.textContent = "Glazing: " + roll.glazing;
    infoContainer.appendChild(glazingType);

    // Pack size
    const packSize = document.createElement('p');
    packSize.textContent = "Pack Size: " + roll.size;
    infoContainer.appendChild(packSize);

    // Price container
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('cart-price-container');
    cartItem.appendChild(priceContainer);

    // Item price
    const itemPrice = document.createElement('p');
    itemPrice.textContent = "$" + roll.calculatedPrice.toFixed(2);
    priceContainer.appendChild(itemPrice);

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
        // Remove the cart item
        cartItem.remove();
        // Update total price
        totalPrice -= roll.calculatedPrice;
        total.textContent = "$" + totalPrice.toFixed(2);
    });
    imageContainer.appendChild(removeButton);

    console.log(totalPrice);

    return cartItem;
}

// Main function to display items in the cart
function displayCart() {
    const cartContainer = document.querySelector('.cart-container');

    // Clear existing cart items
    cartContainer.innerHTML = '';

    // Display each item in the cart
    cart.forEach(roll => {
        const cartItem = createCartItemElement(roll);
        cartContainer.appendChild(cartItem);
        totalPrice += roll.calculatedPrice;
    });

    // Update total price
    total.textContent = "$" + totalPrice.toFixed(2);

    console.log(totalPrice);
}

// Call the displayCart function to initially populate the cart
displayCart();
