/*
memos
*/

//html link
let canvas = document.querySelector('#bounseq > canvas');
canvas.width = (window.innerWidth-20)/2;
canvas.height = 2*(window.innerHeight-35)/2;
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