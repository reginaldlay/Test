var start = document.getElementById("start");
var reset = document.getElementById("reset");

var h = document.getElementById("hour");
var m = document.getElementById("minute");
var s = document.getElementById("sec");

//store a reference to the startTimer variable
var startTimer = null;
var hasStarted = false;

start.addEventListener("click", function () {
    if(!hasStarted){
      startInterval();
      hasStarted = true;
    }
});

reset.addEventListener("click", function () {
  h.value = 0;
  m.value = 0;
  s.value = 0;
  //stop the timer after pressing "reset"
  stopInterval();
});

function startInterval() {
  startTimer = setInterval(function () {
    timer();
  }, 1000);
}

function timer() {
  var moduloTemp;
  if (s.value > 59) {
    moduloTemp = s.value % 60;
    console.log(moduloTemp);
    m.value += (s.value - moduloTemp) / 60;
    s.value = moduloTemp;
  }

  if (m.value > 59) {
    moduloTemp = m.value % 60;
    console.log(moduloTemp);
    h.value += (m.value - moduloTemp) / 60;
    m.value = moduloTemp;
  }

  if (h.value == 0 && m.value == 0 && s.value == 0) {
    h.value = 0;
    m.value = 0;
    s.value = 0;
  } 
  
  else if (s.value != 0) {
    s.value--;
  } 
  
  else if (m.value != 0 && s.value == 0) {
    s.value = 59;
    m.value--;
  } 
  
  else if (h.value != 0 && m.value == 0) {
    m.value = 60;
    h.value--;
  }
  return;
}

function checkTime() {
  var extraM = 0;
  if (s.value > 60) {
    extraH = s.value % 60;
    s.value = 60;
    m.value = extraM;
  }
}

//stop the function after pressing the reset button,
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
  clearInterval(startTimer);
  hasStarted = false;
}