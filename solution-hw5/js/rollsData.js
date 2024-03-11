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

window.onload = function() {
    updateProductImage();
};

//update the name of the roll on the page 

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');


const rollInfo = rolls[rollType];
const rollName = rollType;
const rollPrice = rollInfo.basePrice;


document.getElementById('roll-heading').innerText = rollName + ' Cinnamon Roll';

//getting the price of the roll

document.getElementById('total-price').innerText = rollPrice;

//glaze type 

const glazing = document.getElementById('glazingOptions');


const pack = document.getElementById('packSizeOptions')
document.getElementById('glazingOptions').addEventListener('change', updateTotalPrice);
document.getElementById('packSizeOptions').addEventListener('change', updateTotalPrice);

function updateTotalPrice() {

    const selectedGlazing = glazing.value;
    const glazingObj = glazingOptions.find(option=>option.name === selectedGlazing);

    const glazePrice = glazingObj.price;
     
    const packSize = document.getElementById('packSizeOptions').value;

    console.log("packsize:", packSize);

    const totalPrice = (rollPrice + glazePrice) * packSize;

    console.log("total price:", totalPrice);

    document.getElementById('total-price').innerText = totalPrice;
   
}