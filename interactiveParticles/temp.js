t=0
const renewInterval = 500
function seq(){
    t+=renewInterval
    console.log('t: ', t, 'ms')
}

main = setInterval(seq, renewInterval)