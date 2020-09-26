function somar(){
    let n1 = document.getElementById("E1");
    let n2 = document.getElementById("E2");
    
    let num1 = Number(n1.value);
    let num2 = Number(n2.value);
    
    let tot = num1 + num2;
    
    alert("A soma eh: " + tot);
}
function subtrair(){
    let n1 = document.getElementById("E1");
    let n2 = document.getElementById("E2");
    
    let num1 = Number(n1.value);
    let num2 = Number(n2.value);
    
    let tot = num1 - num2;
    
    alert("A soma eh: " + tot);
}
function multiplicar(){
    let n1 = document.getElementById("E1");
    let n2 = document.getElementById("E2");
    
    let num1 = Number(n1.value);
    let num2 = Number(n2.value);
    
    let tot = num1 * num2;
    
    alert("A soma eh: " + tot);
}
function dividir(){
    let n1 = document.getElementById("E1");
    let n2 = document.getElementById("E2");
    
    let num1 = Number(n1.value);
    let num2 = Number(n2.value);
    
    let tot = num1 / num2;
    
    alert("A soma eh: " + tot);
}
function primos(){
    let n1 = document.getElementById("E1");  
    let n = Number(n1.value);
    
    var cont = 0;
    for(var c = 1 ; c <= n ; c++)
        if(n % c == 0)
            cont++;
            console.log(cont);
    
    if(cont == 2)
        alert("é primo");
    else
        alert("não é primo");
}
    
