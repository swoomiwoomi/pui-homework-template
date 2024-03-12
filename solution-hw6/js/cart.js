let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

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

        // Find the index of the item in the cart array
        const itemIndex = cart.indexOf(roll);

    
        // Update total price
        totalPrice -= roll.calculatedPrice;
        total.textContent = "$" + totalPrice.toFixed(2);
    });
    imageContainer.appendChild(removeButton);

    return cartItem;
}



// Function to save the cart to local storage and print its contents
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart in local storage:", cart);
}



function removeFromCart(index) {
    // Retrieve the item to remove from the cart
    const removedItem = cart[index];

    // Remove the item at the specified index from the cart array
    cart.splice(index, 1);

    // Update total price by subtracting the removed item's price
    totalPrice -= removedItem.calculatedPrice;

    console.log(totalPrice);

    // Save the updated cart to local storage and print its contents
    saveCart();

    // Re-display the updated cart
    displayCart();

    // Update the cart badge icon
    updateCartBadge();
}
function displayCart() {
    // Initialize total price to zero
    totalPrice = 0;

    const cartContainer = document.querySelector('.cart-container');

    // Check if cart container exists
    if (!cartContainer) {
        console.error("Cart container not found.");
        return;
    }

    // Clear existing cart items
    cartContainer.innerHTML = '';

    cart.forEach((roll, index) => {
        const cartItem = createCartItemElement(roll);
        cartContainer.appendChild(cartItem);
        totalPrice += roll.calculatedPrice;
    
        // Attach event listener to the "Remove" button for this item
        const removeButton = cartItem.querySelector('.remove');
        if (removeButton) {
            removeButton.addEventListener('click', (event) => {
                // Stop event propagation to prevent multiple removals
                event.stopPropagation();
                console.log('Remove button clicked for index:', index);
                removeFromCart(index);
            });
        } else {
            console.error("Remove button not found for item at index:", index);
        }
    
        // Log the index assigned to each remove button
        console.log('Remove button assigned to index:', index);
    });

    // Update total price
    const total = document.querySelector('.total-price');
    if (total) {
        total.textContent = "$" + totalPrice.toFixed(2);
    } else {
        console.error("Total price element not found.");
    }
}

// Call the displayCart function to initially populate the cart
displayCart();

// Function to update the cart badge icon
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-icon');
    const cartCount = cart.length; // Get the number of items in the cart
    console.log(cartCount);
    cartBadge.textContent = cartCount; // Update the text content of the cart badge
}

// Call the updateCartBadge function to initially populate the cart badge
updateCartBadge();

