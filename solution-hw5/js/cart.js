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

//given class with added variable that represents the calculated price
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatedPrice = (((this.basePrice + glazingOptions.find(option => option.name === this.glazing).price) * packSizeOptions.find(option => option.name === this.size).price));
    }
}

// Create instances of the Roll class for each roll and push them to the cart array
cart.push(new Roll("Original", "Sugar milk", "1", 2.49));
cart.push(new Roll("Walnut", "Vanilla milk", "12", 3.49));
cart.push(new Roll("Raisin", "Sugar milk", "3", 2.99));
cart.push(new Roll("Apple", "Keep original", "3", 3.49));

//printing the cart to make sure the instances are added
console.log("Cart:", cart);

// Function to calculate the total price of a roll
function calculatePrice(roll) {
    const glazingPrice = glazingOptions.find(option => option.name === roll.glazing)?.price || 0;
    const packSizePrice = packSizeOptions.find(option => option.name === roll.size)?.price || 0;
    return (roll.basePrice + glazingPrice) * packSizePrice;
}

// Function to display the cart contents
function displayCart() {
    const cartContainer = document.querySelector('.cart');
    cartContainer.innerHTML = ''; // Clear previous contents

    cart.forEach(roll => {
        // Create the main container for the cart item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        // Create and append the image element
        const img = document.createElement('img');
        img.src = "../assets/products/" + rolls[roll.type].imageFile;
        img.width = 200;
        img.alt = roll.type;
        img.classList.add('border');
        itemDiv.appendChild(img);

        // Create and append the roll information
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('grid-item3');
        infoDiv.innerHTML = `
            <p>${roll.type} Cinnamon Roll</p>
            <p>Glazing: ${roll.glazing}</p>
            <p>Pack Size: ${roll.size}</p>
        `;
        itemDiv.appendChild(infoDiv);

        // Create and append the price element
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('grid-item3-price');
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = '$' + calculatePrice(roll).toFixed(2);
        priceDiv.appendChild(priceParagraph);
        itemDiv.appendChild(priceDiv);

        // Create and append the remove button
        const removeButton = document.createElement('p');
        removeButton.classList.add('remove-item');
        removeButton.dataset.type = roll.type;
        removeButton.textContent = 'Remove';
        itemDiv.appendChild(removeButton);

        // Append the cart item container to the cart container
        cartContainer.appendChild(itemDiv);
    });

    updateTotalPrice();
}

// Event listener for removing items from the cart
document.querySelector('.cart').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        const typeToRemove = event.target.dataset.type;
        cart = cart.filter(roll => roll.type !== typeToRemove);
        displayCart();
    }
});