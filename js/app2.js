const products = [
    { id: 1, name: "Wireless Headphones", description: "High-quality noise-cancelling over-ear headphones.", price: 89.99, image: "./images/headphone.jpg" },
    { id: 2, name: "Smartwatch", description: "Water-resistant smartwatch with fitness tracking.", price: 129.99, image: "./images/smartwatch.jpg" },
    { id: 3, name: "Gaming Mouse", description: "Ergonomic RGB gaming mouse with 8 programmable buttons.", price: 49.99, image: "./images/mouse.jpg" },
    { id: 4, name: "Mechanical Keyboard", description: "Tactile mechanical keyboard with blue switches.", price: 74.99, image: "./images/keyboard.jpg" },
    { id: 5, name: "4K Monitor", description: "27-inch Ultra HD 4K monitor with ultra-thin bezels.", price: 299.99, image: "./images/monitor.jpg" }
  ];

const cartItems = [];

const productsParentNode = document.querySelector('.products');
const cartParentNode = document.querySelector('.items-in-cart');
let totalPriceNode = document.querySelector('.total');
const checkoutBtn = document.querySelector('.pay');

for (let product of products){
    const productItemNode = document.createElement('div');
    productItemNode.classList.add('product-item');
    productItemNode.setAttribute('data-id', product.id)
    productItemNode.innerHTML = `
                                <div class="product-image">
                                    <img src="${product.image}" alt="item-image">
                                </div>
                                <div class="product-info">
                                    <h2>${product.name}
                                        <span class="item-price">$${product.price}</span>
                                    </h2>
                                    <p>${product.description}</p>
                                    <button class="add" type="button">Add to Cart</button>
                                </div>
    `
    productsParentNode.append(productItemNode);
}

const addToCartBtns = document.querySelectorAll('.add');
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let idn = parseInt(e.target.closest('[data-id]').dataset.id);
        let found = cartItems.find(item => item.id === idn);
        if(found){
            found.quantity++;
        }
        else{
            let item = products.find(itm => itm.id === idn);
            cartItems.push({...item, quantity : 1})
        }
        renderCart();
    })
})

cartParentNode.addEventListener('click',(e) => {
    if(!(e.target.closest('[data-id]'))) return;

    let idn = parseInt(e.target.closest('[data-id]').dataset.id);
    let item = cartItems.find(itm => itm.id === idn);
    let itemIndex = cartItems.findIndex(itm => itm.id === idn);
    if(e.target.classList.contains('increase')){
        item.quantity++;
    }
    else if(e.target.classList.contains('decrease')){
        item.quantity--;
        if(item.quantity === 0){
            cartItems.splice(itemIndex,1);
            renderCart()
            return
        }
    }
    else if(e.target.classList.contains('remove')){
        cartItems.splice(itemIndex,1);
    }
    renderCart();
})


function renderCart(){
    if (cartItems.length == 0){
        cartParentNode.innerHTML = '<h1> Your cart is empty </h1>'
        totalPriceNode.textContent = 'Total: $00.00'
        checkoutBtn.disabled = true;
        return
    }
    else{
        checkoutBtn.disabled = false;
        cartParentNode.innerHTML = '<h1> Your cart </h1>';
        let total = 0;
        for (let item of cartItems){
            const cartItemNode = document.createElement('div');
            cartItemNode.classList.add('cart-items');
            cartItemNode.setAttribute('data-id', item.id);
            cartItemNode.innerHTML = `
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="item-image">
                                        <h4>${item.name}</h4>
                                    </div>
                                    <div class="cart-info">
                                        <div class="quantity-change">
                                            <div class="price">$${item.price} X ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</div>
                                            <button class="increase">+</button>
                                            <span>${item.quantity}</span>
                                            <button class="decrease">-</button>
                                        </div>
                                        <button class="remove" type="button">Remove</button>
                                    </div>
            `
            cartParentNode.append(cartItemNode);
            total += item.price * item.quantity;
        }
        totalPriceNode.textContent = `Total: $${total.toFixed(2)}`
    }
}
renderCart();