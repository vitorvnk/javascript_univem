async function getCount() {
    let respostaCount = await sendRequest("/api/produto/count");
    if (respostaCount.status != 200) {
        return;
    }
    let count = await respostaCount.json();
    return count.count;
}

const listProduto = { order: "id+desc" };

async function listarProdutos(e, order) {

    let params = new URLSearchParams(window.location.search);

    let skip = (Number(params.get("page")) || 1) * 5;

    if (listProduto.order.startsWith(order)) {
        listProduto.order = listProduto.order.endsWith("desc") ? order + "+asc" : order + "+desc";
    }
    else {
        listProduto.order = order ? order + "+asc" : listProduto.order;
    }


    let resposta = await sendRequest(`/odata/produto?$orderby=${listProduto.order}`);
    // fetch(urlApi + "/api/categoria").then(function(resposta){ });
    let json = await resposta.json();

    let table = document.getElementById("produtos");

    if (table == null) return;

    let tbody = table.getElementsByTagName("tbody")[0];

    if (tbody == null) return;

    tbody.innerHTML = "";

    json.value.forEach(produto => {
        let linha = document.createElement("tr"); //<tr></tr>

        addColumn("id", produto, linha);
        let colunaImagem = document.createElement("td");
        if (produto.image) {
            let image = document.createElement("img");
            image.src = produto.image;
            image.className = "imagem-produto";
            colunaImagem.appendChild(image);
        } else {
            colunaImagem.innerHTML = "<b>SEM IMAGEM</b>"
        }
        linha.appendChild(colunaImagem); // adiciona coluna ImagemcolunaImagem

        addColumn("nome", produto, linha);
        addColumn("preco", produto, linha);

        let colunaCategoria = document.createElement("td");
        colunaCategoria.innerHTML = produto.categoria.nome;

        let colunaOperacoes = document.createElement("td");
        let id = produto.id;
        colunaOperacoes.innerHTML = `<button onclick="transitionTo(event, '/produto/edit/${id}')"` +
            'class="btn btn-warning">' +
            'Editar</button>' +
            `<button class="btn btn-danger" onclick="excluirProduto(${id})">Excluir</button>`;
        colunaOperacoes.className = "is-logged";

        linha.appendChild(colunaCategoria); // adiciona coluna categoria
        linha.appendChild(colunaOperacoes); // adiciona coluna categoria
        tbody.appendChild(linha);
    });
    verificarNodes();
}

function carregouPaginaProduto() {
    window.addEventListener("carregoupagina", listarProdutos, { once: true });
}

function carregouFormularioProduto() {
    window.addEventListener("carregoupagina", verificarEdicao, { once: true });
}

async function carregarDropDownCategoria(categorias) {
    let select = document.getElementById("categoria_select");
    if (!categorias) {
        categorias = await getAllCategoria();
    }
    categorias.forEach(categoria => {
        let option = document.createElement("option");
        option.value = categoria.id;
        option.innerText = categoria.nome;
        select.appendChild(option);
    });
}

async function verificarEdicao() {
    let id = window.location.pathname.match(/\d+$/);
    let categorias = null;
    if (id) {
        id = id[0];
        let graphQLConsulta = { "query": "{\r\nproduto(id: " + id + ") {\r\nid\r\nnome\r\npreco\r\ndescricao\r\nestoque\r\nimage\r\ncategoria {\r\nid\r\nnome\r\n}\r\n}\r\ncategoria {\r\nid\r\nnome\r\n}\r\n}" };
        let resposta = await sendRequest("/graphQL", {
            method: "POST",
            body: JSON.stringify(graphQLConsulta),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // fetch(urlApi + "/api/produto").then(function(resposta){ });

        let dadosGraphQL = await resposta.json();
        let produto = dadosGraphQL._data.produto[0];
        categorias = dadosGraphQL._data.categoria;

        let inputNome = document.querySelector("input[name=nome]");
        inputNome.value = produto.nome;
        let inputDescricao = document.querySelector("input[name=descricao]");
        inputDescricao.value = produto.descricao;
        let inputPreco = document.querySelector("input[name=preco]");
        inputPreco.value = produto.preco;
        let inputEstoque = document.querySelector("input[name=estoque]");
        inputEstoque.value = produto.estoque;
        let inputImage = document.querySelector("input[name=image]");
        inputImage.value = produto.image;

        let inputCategoria = document.getElementById("categoria_select");
        inputCategoria.value = produto.categoria.id;
    }
    await carregarDropDownCategoria();
}

async function saveProduto(event) {
    event.preventDefault();
    let form = event.target;
    let json = formDataToJson(form);

    let id = window.location.pathname.match(/\d+$/);
    if (id) {
        id = id[0];
        json.id = id;
    }
    json.categoria = Number(json.categoria);
    let jsonString = JSON.stringify(json);

    let token = getToken();

    let resposta = await sendRequest("/api/produto", {
        method: id == null ? "POST" : "PUT",
        body: jsonString,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (resposta.status == 200) {
        alert("Produto salvo com sucesso!");
        transitionTo(null, "/produto");
    }
    else {
        let jsonResposta = await res.json();
            
        let x = []
        jsonResposta.errors.forEach(erro => x.push((erro.field)))
        jsonResposta.errors.forEach(erro => console.log(erro.field, erro.message))
    }
}

async function excluirProduto(id) {
    let token = getToken();
    let confirmou = confirm("Tem certeza de que deseja excluir esse registro?");
    if (confirmou) {
        let resposta = await sendRequest("/api/produto/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (resposta.status == 200) {
            listarProdutos();
        }
        else {
            alert("Não foi possível excluir o registro");
            let jsonResposta = await res.json();
            
            let x = []
            jsonResposta.errors.forEach(erro => x.push((erro.field)))
            jsonResposta.errors.forEach(erro => console.log(erro.field, erro.message))
        }
    }
}
function imagemload(){
    let url_img = document.querySelector('input#image');
    let din_img = document.querySelector('div#load-img');
    let img = document.createElement('img');

    din_img.innerHTML = ''
    img.setAttribute('src', url_img.value);
    din_img.appendChild(img)
}


window.getCount = getCount;
window.excluirProduto = excluirProduto;
window.saveProduto = saveProduto;
window.verificarEdicao = verificarEdicao;
window.carregarDropDownCategoria = carregarDropDownCategoria;
window.carregouPaginaProduto = carregouPaginaProduto;
window.carregouFormularioProduto = carregouFormularioProduto;
window.listarProdutos = listarProdutos;

