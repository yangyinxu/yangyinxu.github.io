let carts = document.querySelectorAll(".add-cart");

let products = [];

//edit product list based on page title
let title = document.querySelector("title");
if(title.textContent == "Art Supply"){
    products = [
        {
            name: 'Galaxy Book Flex',
            tag: 'gbf',
            price: 3200,
            inCart: 0
        }
    ];
}
else if(title.textContent == "Displays | Art Supply"){
    products = [
        {
            name: 'Wacom Cintiq Pro 32',
            tag: 'wcp32',
            price: 3200,
            inCart: 0
        },
        {
            name: 'Wacom Cintiq Pro 24',
            tag: 'wcp24',
            price: 2400,
            inCart: 0
        },
        {
            name: 'Wacom Cintiq Pro 22hd',
            tag: 'wcp22hd',
            price: 2200,
            inCart: 0
        },
        {
            name: 'Wacom One',
            tag: 'wcone',
            price: 1000,
            inCart: 0
        }
    ];
}
else if(title.textContent == "Tablets | Art Supply"){
    products = [
        {
            name: 'Wcom Intuos Pro',
            tag: 'wip',
            price: 3200,
            inCart: 0
        },
        {
            name: 'Wacom Intuos',
            tag: 'wi',
            price: 2400,
            inCart: 0
        },
        {
            name: 'One by Wacome',
            tag: 'wbw',
            price: 2200,
            inCart: 0
        }
    ];
}
else{
    console.log("Zero products loaded");
}

// Add event listeners for all buttons
for(let i=0; i < carts.length; i++){
    carts[i].addEventListener("click", function(){
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers(){
    //number of items in cart
    let productNumbers = localStorage.getItem('cartNumbers');

    //set productNumbers equal to the value in local storage
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
    else{
        document.querySelector('.cart span').textContent = 0;
    }
}

// Keep track of number of items in the Cart
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    // console.log(productNumbers);

    //if item exist, add one
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{ //else, make it one
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    //grab list of products in cart
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //if cartItems exist, increase the amount of the item by 1
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                //grab data from current cart, and add new item
                ...cartItems,
                [product.tag]: product   
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{ //else create a list for cart
        //set the amount of such item in cart
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//calculates the total cost of items in the cart
function totalCost(product){
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    //cartCost exists
    if(cartCost != null){
        //convert string to number
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price)
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    //convert from JSON to javascript objects
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");

    let cartCost = localStorage.getItem('totalCost');

    //if cartItem is not empty
    if(cartItems && productContainer){
        productContainer.innerHTML = '';

        Object.values(cartItems).map(function(item){
            productContainer.innerHTML += `
            <div class="row"> 
                <span class="d-flex col-3 justify-content-center">${item.name}</span>
                <span class="d-flex col-3 justify-content-center">${item.price}</span>
                <span class="d-flex col-3 justify-content-center">${item.inCart}</span>
                <span class="d-flex col-3 justify-content-center">$ ${item.inCart * item.price}.00</span>
            </div>

            <hr>
            `
        });

        productContainer.innerHTML += `
                <div class="basketTotalContainer">
                    <div class="basketTotalTitle">
                        Total:
                    </div>
                    <div class="basketTotal">
                        $ ${cartCost}.00
                    </div>
                </div>
            `
    }
}

//refresh checks local storage
onLoadCartNumbers();
displayCart();