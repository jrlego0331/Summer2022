//html link
let canvas = document.querySelector('#bouncingCircle > canvas');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-10;
const ctx = canvas.getContext('2d');

//math & physics func
function random(min, max){return Math.round((max-min) * Math.random() + min);}
function absDisplacement(x1, y1, x2, y2){return ((x2-x1)**2+(y2-y1)**2)**0.5;}

//obj funcs
function circle(mass, s_x, s_y, ds_x, ds_y, dds_x, dds_y, r, col){
    this.property = {
        mass: mass,
        s: {x: s_x, y:s_y},
        ds: {x: ds_x, y:ds_y},
        dds: {x: dds_x, y:dds_y},
        r: r,
        col: col
    }

    this.draw = function(fill=true) {
        ctx.beginPath();
        ctx.arc(this.property.s.x, this.property.s.y, this.property.r, 0, 2*Math.PI, false);
        ctx.strokeStyle = this.property.col;
        ctx.stroke();
        ctx.fillStyle = this.property.col;
        if(fill){ctx.fill();}
    }

    this.update = function() {
        //wall collision
        if((this.property.s.x >= canvas.width-this.property.r && this.property.ds.x >= 0) || (this.property.s.x <= this.property.r && this.property.ds.x < 0)){this.property.ds.x *= -1;}
        if((this.property.s.y >= canvas.height-this.property.r && this.property.ds.y >= 0) || (this.property.s.y <= this.property.r && this.property.ds.y < 0)){this.property.ds.y *= -1;}
        
        //other circle collision
        for(let i=0; i<circleList.length; i++){
            if(this!=circleList[i]){
                /*
                if(Math.abs(this.property.s.x-circleList[i].property.s.x) <= this.property.r+circleList[i].property.r && Math.abs(this.property.s.y-circleList[i].property.s.y) <= this.property.r+circleList[i].property.r){
                    this.property.ds.x *= -1;
                    this.property.ds.y *= -1;
                }
                */
                if(absDisplacement(this.property.s.x, this.property.s.y, circleList[i].property.s.x, circleList[i].property.s.y) <= this.property.r+circleList[i].property.r){
                    this.property.ds.x *= -1;
                    this.property.ds.y *= -1;
                }
            }
        }
        //updating s ds dds
        this.property.s.x += this.property.ds.x;
        this.property.s.y += this.property.ds.y;
        this.property.ds.x += this.property.dds.x;
        this.property.ds.y += this.property.dds.y;
    }
}

const circleCount = 10;
const param ={
    mass: {min: 5, max: 5},
    r: {min: 10, max: 50},
    s: {x: {min: 0, max: canvas.width}, y: {min: 0, max: canvas.height}},
    ds: {x: {min: -5, max: 5}, y:{min: -5, max: 5}},
    dds: {x: {min: 0, max: 0}, y:{min: 0, max: 0}},
    col: "rgba(255, 255, 255, 1.0)"
}
let circleList = [];

function main(){
    requestAnimationFrame(main);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<circleList.length; i++){
        circleList[i].draw();
        circleList[i].update();
    }
}

for(let i=0; i<circleCount; i++){
    mass = random(param.mass.min, param.mass.max);
    r = random(param.r.min, param.r.max);
    s_x = random(param.s.x.min, param.s.x.max);
    if(s_x>=canvas.width/2){s_x-=r;}
    if(s_x<canvas.width/2){s_x+=r;}
    s_y = random(param.s.y.min, param.s.y.max);
    if(s_y>=canvas.height/2){s_y-=r;}
    if(s_y<canvas.height/2){s_y+=r;}
    ds_x = random(param.ds.x.min, param.ds.x.max);
    ds_y = random(param.ds.y.min, param.ds.y.max);
    dds_x = random(param.dds.x.min, param.dds.x.max);
    dds_y = random(param.dds.y.min, param.dds.y.max);
    //col = param.col
    col = 'rgba('+String(255*(i+1)/circleCount)+','+ String(255 - 255*(i+1)/circleCount) + ',255,1.0)'

    circleList.push(new circle(mass, s_x, s_y, ds_x, ds_y, dds_x, dds_y, r, col))
}

main();