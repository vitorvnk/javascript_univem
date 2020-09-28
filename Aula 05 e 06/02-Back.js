function regexpExec() {
    var texto = document.getElementById("E1");
    var Regex = (/\d/g);
    var n = Regex.exec(texto);
    alert(n);
    alert(texto);
}