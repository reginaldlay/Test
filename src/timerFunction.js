var start = document.getElementById("startBtn");
var reset = document.getElementById("resetBtn");

var hour = document.getElementById("hour");
var min = document.getElementById("minute");
var sec = document.getElementById("sec");

var startTimer = null;
var hasStarted = false;

start.addEventListener("click", function () {
    if(!hasStarted){
      startInterval();
      hasStarted = true;
    }
});

reset.addEventListener("click", function () {
  hour.value = 0;
  min.value = 0;
  sec.value = 0;
  stopInterval();
});

function startInterval() {
  startTimer = setInterval(function () {
    timer();
  }, 1000);
}

function timer() {
  var moduloTemp;
  if (sec.value > 59) {
    moduloTemp = sec.value % 60;
    console.log(moduloTemp);
    min.value += (sec.value - moduloTemp) / 60;
    sec.value = moduloTemp;
  }

  if (min.value > 59) {
    moduloTemp = min.value % 60;
    console.log(moduloTemp);
    hour.value += (min.value - moduloTemp) / 60;
    min.value = moduloTemp;
  }

  if (hour.value == 0 && min.value == 0 && sec.value == 0) {
    hour.value = 0;
    min.value = 0;
    sec.value = 0;
    //MAININ ALARM DISINI
  } 
  
  else if (sec.value != 0) {
    sec.value--;
  } 
  
  else if (min.value != 0 && sec.value == 0) {
    sec.value = 59;
    min.value--;
  } 
  
  else if (hour.value != 0 && min.value == 0) {
    min.value = 60;
    hour.value--;
  }
  return;
}

function stopInterval() {
  clearInterval(startTimer);
  hasStarted = false;
}