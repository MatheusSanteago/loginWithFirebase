var display = document.getElementById("clock");

function startDate() {
    var today = new Date();
    var mes = today.getMonth();
    mes = putZero(mes);
    var date = today.getDate() + "/" + mes + "/" + today.getFullYear();
    return date;
  }
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = putZero(m);
    s = putZero(s);
    display.innerHTML = startDate() + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  
  function putZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }