function getHtml() {
    let path = window.location.pathname;
    switch (path) { // verifica qual é a rota
        case "/":
            return "./src/inicial.html"
        case "/categoria":
            carregouPaginaCategoria();
            return "/src/categoria/list.html";
        case "/produto":
            carregouPaginaProduto();
            return "/src/produto/list.html";
    }
    if (isLoggedIn()) {
        switch (path) {
            case "/categoria/criar":
                return "/src/categoria/form.html";
            case "/produto/criar":
                carregouFormularioProduto();
                return "/src/produto/form.html";
            default:
                if (path.match(/^\/categoria\/edit\/\d+$/)) {
                    carregarFormularioEdit();
                    return "/src/categoria/form.html";
                }
                else if (path.match(/^\/produto\/edit\/\d+$/)) {
                    carregouFormularioProduto();
                    return "/src/produto/form.html";
                }
        }
    }
    else {
        switch (path) {
            case "/entrar":
                return "/src/entrar.html"
            case "/registrar":
                return "/src/register.html";
            case "/login":
                return "/src/login.html";
        }
    }
    return null;
}


function carregarConteudo() {
    let html = getHtml();
    let container = document.getElementById("container");

    if (html) {
        fetch(html)
            .then(
                resposta => resposta.text()
            )
            .then(function (texto) {
                container.innerHTML = texto;
                window.dispatchEvent(new Event("carregoupagina"));
            });
    } else {
        window.dispatchEvent(new Event("carregoupagina"));
    }
}

function transitionTo(event, path) {
    event && event.preventDefault(); 
    window.history.pushState("", "", path); 
    carregarConteudo();
}

window.addEventListener("popstate", () => carregarConteudo());
window.addEventListener("load", () => carregarConteudo());