/*
memos
*/

//html link
emptyModule.canvas = document.querySelector('#emptyModule > canvas');
emptyModule.canvas.width = (window.innerWidth-5);
emptyModule.canvas.height = (window.innerHeight-35)/3;

//math func
function degToRad(deg){return (deg/360)*(2*Math.PI);}

//notation func
function rgb([r, g, b]){return "rgb("+r+','+g+','+b+")"}

function main(){
    requestAnimationFrame(main);
    //ctx.clearRect(0, 0, emptyModule.canvas.width, emptyModule.canvas.height);
    ctx = emptyModule.canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(objInit.initPos.x, objInit.initPos.y, objInit.radius, objInit.initTheta, objInit.initTheta+degToRad(t), false);
    ctx.strokeStyle=rgb([objInit.col.r-(255*t/360), objInit.col.g+(255*t/360), objInit.col.b]);
    ctx.lineWidth=objInit.lineWidth;
    ctx.stroke();
    //ctx.fillstyle = "rgb(255, 255, 255";
    //ctx.fill();
    t+=1;
    if(t>360){t=0}
}

t=0
let objInit={}
objInit.radius=60
objInit.initPos={x:emptyModule.canvas.width/2, y:emptyModule.canvas.height/2}
objInit.initTheta=0.5*Math.PI
objInit.lineWidth=5
objInit.col={r:255, g:0, b:255}

main();