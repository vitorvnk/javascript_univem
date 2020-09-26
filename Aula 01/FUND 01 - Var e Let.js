// assincrono: ocorre fora de intervalo
// print("a", "b", "c")
// O valor de Var continua existindo fora do if 
// Valor de Let some depois de executado o bloco do if

function somarlet() {
    let n1 = document.getElementById("numero1");
    let n2 = document.getElementById("numero2");

    let valor1 = Number(n1["value"]);
    let valor2 = Number(n2.value);
    
    if (n1 > n2){
        
    
        let soma = valor1 + valor2;
    
        alert("O valor da soma eh: " + soma);
    }
    alert("O valor da soma eh: " + soma);
}

function somarvar() {
    var n1 = document.getElementById("numero1");
    var n2 = document.getElementById("numero2");

    var valor1 = Number(n1["value"]);
    var valor2 = Number(n2.value);

    if (n1 > n2){
        var soma = valor1 + valor2;
    
        alert("O valor da soma eh: " + soma);
    }
    alert("O valor da soma eh: " + soma);
}



