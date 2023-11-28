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

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - R$ ${item.total.toFixed(2)}`;
        cartItems.appendChild(listItem);

        total += item.total;
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
        let total = 0;
        let quantity = 0;

        for (const item of cart) {
            total += item.total;
            quantity += item.quantity;
        }

        // Redirecionar para a página de cadastro com os parâmetros na URL
        window.location.href = `cadastro.html?total=${total.toFixed(2)}&quantity=${quantity}`;

        alert('Compra realizada com sucesso! Total: R$ ' + total.toFixed(2));
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    } else {
        alert('Adicione produtos ao carrinho antes de finalizar a compra.');
    }
}


