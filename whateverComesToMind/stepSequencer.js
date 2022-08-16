/*
memos
*/

//html link
let canvas = document.querySelector('#stepSequencer > canvas');
canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight/2;
const ctx = canvas.getContext('2d');

//buttonFuncs

/*
    this.draw = function(fill=true) {
        ctx.beginPath();
        ctx.arc(this.property.s.x, this.property.s.y, this.property.r, 0, 2*Math.PI, false);
        ctx.strokeStyle = this.property.col;
        ctx.stroke();
        ctx.fillStyle = this.property.col;
        if(fill){ctx.fill();}
    }
*/
function main(){
    requestAnimationFrame(main);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

main();