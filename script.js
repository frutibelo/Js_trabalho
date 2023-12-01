
// Adiciona um produto ao carrinho
function addCarrinho(nomeProduto, preco, idquantidade) {
    const quantidade = parseInt(document.getElementById(idquantidade).value);
    const total = preco * quantidade;

    const item = { nome: nomeProduto, preco, quantidade, total };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarCarrinho();
}

// Atualiza o conteúdo do carrinho na interface
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const elementoTotal = document.getElementById('total');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;

    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        const elementoLista = document.createElement('li');
        elementoLista.textContent = `${item.nome} x${item.quantidade} - R$ ${item.total.toFixed(2)}`;
        listaCarrinho.appendChild(elementoLista);

        total += item.total;
    });

    elementoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Finaliza a compra e redireciona para a página de cadastro
function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length > 0) {
        let total = 0;
        let quantidade = 0;

        for (const item of carrinho) {
            total += item.total;
            quantidade += item.quantidade;
        }

        window.location.href = `cadastro.html?total=${total.toFixed(2)}&quantidade=${quantidade}`;

        alert('Total: R$ ' + total.toFixed(2));
        carrinho = [];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    } else {
        alert('Adicione produtos ao carrinho antes de finalizar a compra.');
    }
}

//Enviar o e-mail com o texto com as informações
function validar() {  
    var Nome = document.getElementById("nome").value
    var Email = document.getElementById("email").value
    var Cpf = document.getElementById("cpf").value
    var Cep = document.getElementById("cep").value
    var Telefone = document.getElementById("telefone").value

    var texto = "Nome: " + Nome + ", E-mail " + Email + ", CPF: " + Cpf + ", CEP: " + Cep + ", Telefone: " + Telefone + "." + "Produtos adquiridos:" + listaCarrinho[0] + " Preço total: " + total[0]
    
    window.alert(texto)
    document.getElementById("idtexto").innerHTML = texto
    console.log(texto)
}
