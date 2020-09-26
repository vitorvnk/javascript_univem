function regexpExec() {
    var str = document.getElementById("E1");
    var re = new RegExp("/\d*/g");
    var n = regexp.exec(str);
    alert(n);
    alert(str);
}