async function buscarCep(event) {
    let cont = 0;
    // o target do event é o elemento que está disparando o evento, ou seja, o input
    let input = event.target.value; // 17500-100
    let cep = input.match(/\d+/g).join(''); // 17500100

    let res = await fetch("https://viacep.com.br/ws/" + cep + "/json");
    if (res.status == 200) {
        let endereco = await res.json();
        let cidade = document.querySelector("form input[name=cidade]");
        cidade.value = endereco.localidade;
        let uf = document.querySelector("form input[name=uf]");
        uf.value = endereco.uf;
        let bairro = document.querySelector("form input[name=bairro]");
        bairro.value = endereco.bairro;
        let logradouro = document.querySelector("form input[name=logradouro]");
        logradouro.value = endereco.logradouro;
        let numero = document.querySelector("form input[name=numero]");

        if (bairro.value == "") {
            bairro.focus();
        } else if (logradouro.value == "") {
            logradouro.focus();
        } else if (numero.value == "") {
            numero.focus();
        }
        console.log(numero.value);
    }
}

function formDataToJson(form) {
    let data = new FormData(form);
    let jsonObj = {};

    for (const item of data.keys()) {
        let v = data.get(item);
        jsonObj[item] = v;
    }
    return jsonObj;
}

async function registrar(event) {
    let sNome = document.querySelector("small#sNomeReg");
    let sEmail = document.querySelector("small#sEmailReg");
    let sSenha = document.querySelector("small#sSenhaReg");
    let sCofSenha = document.querySelector("small#sConfSenhaReg");
    let sCep = document.querySelector("small#sCepReg");
    let sCid = document.querySelector("small#sCidReg");
    let sUf = document.querySelector("small#sUfReg");
    let sBairro = document.querySelector("small#sBaiReg");
    let sLog = document.querySelector("small#sLogReg");
    let sNum = document.querySelector("small#sNumReg");

    sNome.innerText = ''
    sEmail.innerText = ''
    sSenha.innerText = ''
    sCofSenha.innerText = ''
    sCep.innerText = ''
    sCid.innerText = ''
    sUf.innerText = ''
    sBairro.innerText = ''
    sLog.innerText = ''
    sNum.innerText = ''

    event.preventDefault();
    let form = event.target;

    let jsonBody = formDataToJson(form);
    console.log(jsonBody);

    let jsonString = JSON.stringify(jsonBody);

    const urlApi = "https://javascriptunivem.azurewebsites.net";

    let res = await fetch(urlApi + "/api/usuario", {
        method: "POST",
        body: jsonString,
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status == 200) {
        alert("Cadastrado com sucesso! Vá para a pagina de login");
    } else {
        let jsonResposta = await res.json();
        
        let x = []
        jsonResposta.errors.forEach(erro => x.push((erro.field)))
        jsonResposta.errors.forEach(erro => console.log(erro.field, erro.message))

        if (x.indexOf('Nome') != -1){
            sNome.innerText = 'Nome Invalido.'
        }
        if (x.indexOf('Email') != -1){
            sEmail.innerText = 'E-mail Invalido.'
        }
        if(x.indexOf('Password') != -1){
            sSenha.innerText = 'Senha Invalida.'
            sCofSenha.innerText = 'Confirmacao Invalida'
        } 
        if (x.indexOf('Cep') != -1){
            sCep.innerText =  'CEP Invalido.'
        }
        if (x.indexOf('Cidade') != -1){
            sCid.innerText = 'Cidade Invalida.'
        }
        if (x.indexOf('Uf') != -1){
            sUf.innerText = 'UF Invalida.'
        }
        if (x.indexOf('Bairro') != -1){
            sBairro.innerText = 'Bairro Invalido.'
        }
        if (x.indexOf('Logradouro') != -1){
            sLog.innerText = 'Logradouro Invalido.'
        }
        if (x.indexOf('Numero') != -1){
            sNum.innerText = 'Numero Invalido.'
        }

        
    }
}