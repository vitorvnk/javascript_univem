async function logar(event) {
    event.preventDefault();

    let sEmail = document.querySelector("small#sEmailLog");
    let sSenha = document.querySelector("small#sSenhaLog");

    sEmail.innerText = ''
    sSenha.innerText = ''

    let form = event.target;
    let jsonBody = formDataToJson(form);
    let jsonString = JSON.stringify(jsonBody);

    let res = await sendRequest("/api/usuario/login", {
        method: "POST",
        body: jsonString,
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status == 200) {
        alert("Login feito com sucesso!");
        let jsonResposta = await res.json();
        window.localStorage.setItem("token", jsonResposta.accessToken);
        window.localStorage.setItem("username", jsonResposta.userName);
        // window.dispatchEvent(new Event("loggedIn"));
        transitionTo(null, '/');
    } else {
        let jsonResposta = await res.json();
        
        let x = []
        jsonResposta.errors.forEach(erro => x.push((erro.field)))
        jsonResposta.errors.forEach(erro => console.log(erro.field, erro.message))

        if (x.indexOf('Email') != -1){
            sEmail.innerText = 'E-mail Invalido.'
        }
        if(x.indexOf('Password') != -1){
            sSenha.innerText = 'Senha Invalida.'
        } else{
            sSenha.innerText = 'Dados Inválidos'
        }
    }
}