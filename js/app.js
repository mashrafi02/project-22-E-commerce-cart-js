const products = [
    { id: 1, name: "Wireless Headphones", description: "High-quality noise-cancelling over-ear headphones.", price: 89.99, image: "https://images.unsplash.com/photo-1585386959984-a4155228a1ab?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Smartwatch", description: "Water-resistant smartwatch with fitness tracking.", price: 129.99, image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Gaming Mouse", description: "Ergonomic RGB gaming mouse with 8 programmable buttons.", price: 49.99, image: "https://images.unsplash.com/photo-1587202372775-98973b1f8bfa?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Mechanical Keyboard", description: "Tactile mechanical keyboard with blue switches.", price: 74.99, image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "4K Monitor", description: "27-inch Ultra HD 4K monitor with ultra-thin bezels.", price: 299.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80" }
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
                                    <img src="" alt="item-image">
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
            for(let item of cartItems){
                if (item.id === idn){
                    item.quantity ++;
                    break;
                }
            };
        }
        else{
            let item = products[idn-1]
            cartItems.push({...item, quantity : 1})
        }
        renderCart();
    })
})


function renderCart(){
    if (cartItems.length == 0){
        cartParentNode.innerHTML = '<h1> Your cart is empty </h1>'
        totalPriceNode.textContent = 'Total: $00.00'
        checkoutBtn.disabled = true;
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
                                        <img src="" alt="item-image">
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

        const increaseBtn = document.querySelectorAll('.increase');
        const decreaseBtn = document.querySelectorAll('.decrease');
        const removeBtn = document.querySelectorAll('.remove');

        increaseBtn.forEach(incBtn => {
            incBtn.addEventListener('click', (e) => {
                let idn = parseInt(e.target.closest('[data-id]').dataset.id);
                for (let item of cartItems){
                    if (item.id === idn){
                        item.quantity ++;
                        break;
                    }
                }
                renderCart();
            })
        })

        decreaseBtn.forEach(deccBtn => {
            deccBtn.addEventListener('click', (e) => {
                let idn = parseInt(e.target.closest('[data-id]').dataset.id);
                for (let item of cartItems){
                    if (item.id === idn){
                        item.quantity --;
                        if(item.quantity == 0){
                            let index = cartItems.indexOf(item);
                            cartItems.splice(index,1);
                        }
                        break;
                    }
                }
                renderCart();
            })
        })

        removeBtn.forEach(revBtn => {
            revBtn.addEventListener('click', (e) => {
                let idn = parseInt(e.target.closest('[data-id]').dataset.id);
                for (let item of cartItems){
                    if(item.id === idn){
                        let index = cartItems.indexOf(item);
                        cartItems.splice(index,1);
                        break;
                    }
                }
                renderCart();
            })
        })
    }
}
renderCart();