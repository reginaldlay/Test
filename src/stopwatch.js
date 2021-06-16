// const timer = document.getElementById('stopwatch');

// var hours = 0;
// var minutes = 0;
// var seconds = 0;
// var stoptime = true;

var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;

function startTimer(){

    // if(stoptime == true){
    //     stoptime = false;
    //     timerCycle();
    // }

    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }
    console.log(stoppedDuration);

    started = setInterval(timerCycle, 10);
}

function stopTimer(){

    // if(stoptime == false){
    //     stoptime = true;
    // }

    timeStopped = new Date();
    clearInterval(started);
}

function timerCycle(){

    // if(stoptime == false){
        
    //     seconds = parseInt(seconds);
    //     minutes = parseInt(minutes);
    //     hours = parseInt(hours);

    //     seconds = seconds + 1;

    //     if(seconds == 60){
            
    //         minutes = minutes + 1;
    //         seconds = 0;
    //     }
    //     if(minutes == 60){
    //         hours = hours + 1;
    //         minutes = 0;
    //     }
        
    //     if(seconds < 10){
    //         seconds = '0' + seconds;
    //     }
    //     if(minutes < 10){
    //         minutes = '0' + minutes;
    //     }
    //     if(hours < 10){
    //         hours = '0' + hours;
    //     } 

    //     timer.innerHTML = hours + ':' + minutes + ':' + seconds; 
    //     setTimeout("timerCycle()", 1000);
    //}

    var currentTime = new Date()
        , timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

    document.getElementById("stopwatch").innerHTML = 
        (hour > 9 ? hour : "0" + hour) + ":" + 
        (min > 9 ? min : "0" + min) + ":" + 
        (sec > 9 ? sec : "0" + sec) + "." + 
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);

    
}

function resetTimer(){

    // timer.innerHTML = '00:00:00';

    // seconds = 0;
    // minutes = 0;
    // hours = 0;

    // stoptime = true;  
    
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    document.getElementById("stopwatch").innerHTML = "00:00:00.000";
}