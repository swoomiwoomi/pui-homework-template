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

//updates the image according to the roll

function updateProductImage() {
    var rollType = getUrlParameter('roll');
    var imageFile = rolls[rollType].imageFile;

    document.getElementById('product-image').src = "../assets/products/" + imageFile;
}

//changes the url name to match the roll

function getUrlParameter(name) {
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);
    const paramValue = params.get(name);

    return paramValue ? paramValue : '';
}

window.onload = function () {
    updateProductImage();
};

//update the name of the roll on the page 

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');


const rollInfo = rolls[rollType];
const rollName = rollType;
console.log("rollType:", rollType);
console.log("rollInfo:", rolls[rollType]);
const rollPrice = rollInfo.basePrice;


document.getElementById('roll-heading').innerText = rollName + ' Cinnamon Roll';

//getting the price of the roll

document.getElementById('total-price').innerText = rollPrice;

//glaze type 

const glazing = document.getElementById('glazingOptions');

//pack type

const packSize = document.getElementById('packSizeOptions').value;


const pack = document.getElementById('packSizeOptions')
document.getElementById('glazingOptions').addEventListener('change', updateTotalPrice);
document.getElementById('packSizeOptions').addEventListener('change', updateTotalPrice);

function updateTotalPrice() {
    const selectedGlazing = glazing.value;
    const glazingObj = glazingOptions.find(option => option.name === selectedGlazing);
    const glazePrice = glazingObj.price;

    const selectedPackSize = document.getElementById('packSizeOptions').value;
    const packSizePrice = packSizeOptions.find(option => option.name === selectedPackSize).price;


    const totalPrice = (rollPrice + glazePrice) * packSizePrice;

    document.getElementById('total-price').innerText = "$" + totalPrice.toFixed(2); // Display as currency
}

// get cart from local storage
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// save cart to local storage and print cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart in local storage:", cart);
}

// add to cart function
function addToCart() {
    const rollType = rollName;
    const rollGlazing = document.getElementById('glazingOptions').value;
    const packSize = document.getElementById('packSizeOptions').value;
    const rollPrice = parseFloat(document.getElementById('total-price').innerText.substring(1)); // Remove '$' and parse as float

    // create a new roll and add to cart
    const newRoll = new Roll(rollType, rollGlazing, packSize, rollPrice);
    cart.push(newRoll);



     // save cart to local storage 
     saveCart();

     // update cart icon
     updateCartIcon();
 }


 // update cart icon function
function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = cart.length; // Get the number of items in the cart
    cartIcon.textContent = cartCount; // Update the text content of the cart icon
}

updateCartIcon();
 
 // event listener for remove button
 document.querySelectorAll('.remove').forEach((button, index) => {
     button.addEventListener('click', () => {
         removeFromCart(index);
     });
 });


// event listener for add to cart button
const addToCartButton = document.querySelector(".addtocart");
addToCartButton.addEventListener("click", addToCart);

// update DOM
updateProductImage();
document.getElementById('roll-heading').innerText = rollName + ' Cinnamon Roll';
document.getElementById('total-price').innerText = "$" + rollPrice.toFixed(2);