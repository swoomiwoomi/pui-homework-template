document.addEventListener("DOMContentLoaded", function() {

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
    
    // create a cart item element
    function createCartItemElement(roll) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
    
        // img container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('cart-image-container');
        cartItem.appendChild(imageContainer);
    
        // img
        const image = document.createElement('img');
        image.src = roll.rollImage;
        image.alt = roll.type + ' Cinnamon Roll';
        image.style.width = '200px'; // Set image width to 200px
        imageContainer.appendChild(image);
    
        // item info container
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('cart-info-container');
        cartItem.appendChild(infoContainer);
    
        // roll name
        const rollName = document.createElement('p');
        rollName.textContent = roll.type + ' Cinnamon Roll';
        infoContainer.appendChild(rollName);
    
        // glazing type
        const glazingType = document.createElement('p');
        glazingType.textContent = "Glazing: " + roll.glazing;
        infoContainer.appendChild(glazingType);
    
        // pack size
        const packSize = document.createElement('p');
        packSize.textContent = "Pack Size: " + roll.size;
        infoContainer.appendChild(packSize);
    
        // price container
        const priceContainer = document.createElement('div');
        priceContainer.classList.add('cart-price-container');
        cartItem.appendChild(priceContainer);
    
        // item price
        const itemPrice = document.createElement('p');
        itemPrice.textContent = "$" + roll.calculatedPrice.toFixed(2);
        priceContainer.appendChild(itemPrice);
    
        
    
        // remove
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.textContent = "Remove";
        removeButton.addEventListener('click', () => {
            // remove cart item
            cartItem.remove();
    
            // find index of item
            const itemIndex = cart.indexOf(roll);
    
        
            // update total price
            totalPrice -= roll.calculatedPrice;
            total.textContent = "$" + totalPrice.toFixed(2);
        });
        imageContainer.appendChild(removeButton);
    
        return cartItem;
    }
    
    
    
    // save cart and print contents
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Cart", cart);
    }
    
    
    
    function removeFromCart(index) {
        // initialize the removed item
        const removedItem = cart[index];
    
        // remove the item from the array
        cart.splice(index, 1);
    
        // subtract removed item's price
        totalPrice -= removedItem.calculatedPrice;
    
        saveCart();
    
        displayCart();
    
        updateCartIcon();
    }
    
    
    // calculate total price
    function calculateTotalPrice() {
        totalPrice = 0;
        cart.forEach(roll => {
            totalPrice += roll.calculatedPrice;
        });
    }
    
    function displayCart() {
        // set total price to zero to start
        totalPrice = 0;
    
        const cartContainer = document.querySelector('.cart-container');

    
        // clear items
        cartContainer.innerHTML = '';
    
        cart.forEach((roll, index) => {
            const cartItem = createCartItemElement(roll);
            cartContainer.appendChild(cartItem);
            totalPrice += roll.calculatedPrice;
    
            // update total price
        const total = document.querySelector('.total-price');
        if (total) {
            total.textContent = "$" + totalPrice.toFixed(2);
        } 
        
            // event listener for remove
            const removeButton = cartItem.querySelector('.remove');
            if (removeButton) {
                removeButton.addEventListener('click', (event) => {
                    removeFromCart(index);
                });
            } 
        

        });
    
    }
    

    displayCart();
    
    // function to update the cart icon
    function updateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        const cartCount = cart.length;
        cartIcon.textContent = cartCount; 
    }
    
    updateCartIcon();
    
    });