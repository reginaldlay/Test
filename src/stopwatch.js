const timer = document.getElementById("stopwatch");

var hours = 0;
var minutes = 0;
var seconds = 0;
var miliseconds = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}

function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  if (stoptime == false) {
    seconds = parseInt(seconds);
    minutes = parseInt(minutes);
    hours = parseInt(hours);
    miliseconds = parseInt(miliseconds);

    miliseconds = miliseconds + 5;

    if (miliseconds == 1000) {
      seconds = seconds + 1;
      miliseconds = 0;
    }

    if (seconds == 60) {
      minutes = minutes + 1;
      seconds = 0;
    }
    if (minutes == 60) {
      hours = hours + 1;
      minutes = 0;
    }

    if (miliseconds < 100) {
      if (miliseconds < 10) {
        miliseconds = "0" + miliseconds;
      }
      miliseconds = "0" + miliseconds;
    }

    if (seconds < 10) seconds = "0" + seconds;

    if (minutes < 10) minutes = "0" + minutes;

    if (hours < 10) hours = "0" + hours;

    timer.innerHTML = hours + ":" + minutes + ":" + seconds + "." + miliseconds;
    setTimeout("timerCycle()", 1);
  }
}

function resetTimer() {
  timer.innerHTML = "00:00:00.000";

  seconds = 0;
  minutes = 0;
  hours = 0;
  miliseconds = 0;

  stoptime = true;
}
