let timeUpMessage = "TIMES UP!"
    function countdown(currenttime=document.getElementById('timer')){
        if(currenttime.innerText != timeUpMessage){
            if(currenttime.innerText == 0){
                currenttime.innerText = timeUpMessage
                currenttime.id = "URGENT"
            }
            else{
                currenttime.innerText -= 1
            }
        }
    }
    setInterval(countdown, 1000)