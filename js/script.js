let navbar = document.querySelector('.header .navbar');

let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Bored Ape #5230',
        tag: 'image/BoredApe.png',
        price: 1266859,
        incart: 0,
    },
    {
        name: 'Toxic Skulls Club #9419',
        tag: '#9419',
        price: 47228,
        incart: 0,
    },
    {
        name: 'SMOWL #4106',
        tag: '#4106',
        price: 211558,
        incart: 0,
    },
    {
        name: 'TREND SETTER #155',
        tag: '#155',
        price: 2043482,
        incart: 0,
    },
    {
        name: 'Pudgy Penguin #3950',
        tag: '#3950',
        price: 310112,
        incart: 0,
    },
    {
        name: 'Sogette #4771',
        tag: '#4771',
        price: 698221,
        incart: 0,
    },
    {
        name: 'Bored Ape #3105',
        tag: '#3105',
        price: 1643878,
        incart: 0,
    },
    {
        name: 'V1 PUNK #8305',
        tag: '#8305',
        price: 120888,
        incart: 0,
    },
    
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 
        1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + 
        product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
 let cartItems = localStorage.getItem("productsInCart");
 cartItems = JSON.parse(cartItems)
 let productContainer = document.querySelector
 (".products");
 let cartCost = localStorage.getItem('totalCost');

 if( cartItems && productContainer ) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="product">

        <span>${item.name}</span>
        </div>
        <div class="price">${item.price},KD</div>
        <div class="quantity">
        <ion-icon name="caret-back-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="caret-forward-circle"></ion-icon>
        </div>
        <div class="total">
            ${item.inCart * item.price},00KD
        </div>
        `
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
            Total
        </h4>
        <h4 class="basketTotal">
            ${cartCost},00kd
        </h4>
    `

 }

}

onLoadCartNumbers(); 
displayCart()

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');    
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}

document.querySelector('.home').onmousemove = (e) =>{

    let x = (window.innerWidth - e.pageX * 2) / 90;
    let y = (window.innerHeight - e.pageY * 2) / 90;

    document.querySelector('.home .home-parallax-img').style.transform = `translateX(${y}px) translateY(${x}px)`;
}

document.querySelector('.home').onmouseleave = () =>{

    document.querySelector('.home .home-parallax-img').style.transform = `translateX(0px) translateY(0px)`;
}   