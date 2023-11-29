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


        window.location.href = `cadastro.html?total=${total.toFixed(2)}&quantity=${quantity}`;

        alert('Compra realizada com sucesso! Total: R$ ' + total.toFixed(2));
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    } else {
        alert('Adicione produtos ao carrinho antes de finalizar a compra.');
    }
}

function mostrarResumo() {
    // Obtém os valores do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const cep = document.getElementById('cep').value;
    const telefone = document.getElementById('telefone').value;

    // Obtém os valores do carrinho
    const urlParams = new URLSearchParams(window.location.search);
    const total = urlParams.get('total');
    const quantity = urlParams.get('quantity');

    // Exibe as informações abaixo do formulário
    const resumoContainer = document.getElementById('resumo-container');
    resumoContainer.innerHTML = `
        <h2>Resumo do Cadastro</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <p><strong>CEP:</strong> ${cep}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>

        <h2>Resumo da Compra</h2>
        <p><strong>Total de Itens:</strong> ${quantity}</p>
        <p><strong>Total da Compra:</strong> R$ ${total}</p>
    `;

    // Exibe mensagem de confirmação
    alert('Cadastro realizado com sucesso!');
}

