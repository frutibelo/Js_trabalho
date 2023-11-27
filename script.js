let cart = [];

function addToCart(productName, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    const total = price * quantity;

    const item = {
        name: productName,
        price: price,
        quantity: quantity,
        total: total
    };

    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - R$ ${item.total.toFixed(2)}`;
        cartItems.appendChild(listItem);

        total += item.total;
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length > 0) {
        alert('Compra realizada com sucesso! Total: R$ ' + cart.reduce((total, item) => total + item.total, 0).toFixed(2));
        cart = [];
        updateCart();
    } else {
        alert('Adicione produtos ao carrinho antes de finalizar a compra.');
    }
}