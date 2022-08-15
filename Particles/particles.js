//html const settings
const mainCanvas = document.querySelector('#mainCanvas');
const width = mainCanvas.width;
const height = mainCanvas.height;

//random related func
function randomFloat(min, max, decimal=param.decimal){
    return parseFloat(((max-min)*Math.random()+min).toFixed(decimal));
}

function randomCol(min=param.col.min, max=param.col.max){
    return [parseInt((max-min)*Math.random()+min), parseInt((max-min)*Math.random()+min), parseInt((max-min)*Math.random()+min)];
}

//physics related func
function a_g(selfS, targetMass, targetS, G=6.67*(10**-1.5)){
    direction = (targetS-selfS)/(Math.abs(targetS-selfS))
    return direction * Math.max((G*targetMass) / ((targetS-selfS)**2), param.aMagMax)
}

//obj related func
function objCreate(count){
    for(let i = 0; i<count; i++){
        let obj = {
            mass: randomFloat(param.mass.min, param.mass.max),
            s:{
                x: randomFloat(param.s.x.min, param.s.x.max),
                y: randomFloat(param.s.y.min, param.s.y.max)
            },
            v: {
                x: randomFloat(param.v.x.min, param.v.x.max), 
                y: randomFloat(param.v.y.min, param.v.y.max)
            },
            a: {
                x: 0.0,
                y: 0.0
            },
            col: randomCol()
        }
        objList.push(obj);
    }
}

function objDraw(){
    const ctx = mainCanvas.getContext("2d");
    ctx.fillStyle="rgb(0,0,0)"
    ctx.fillRect(0, 0, width, height);
    
    for (let index=0; index<objList.length; index++) {
        ctx.fillStyle="rgb("+String(objList[index].col)+")";
        ctx.beginPath();
        ctx.arc(objList[index].s.x, objList[index].s.y, param.radius, 0, 2*Math.PI);
        ctx.fill();
    }
}

function objUpdate(){
    for(let index=0; index<objList.length; index++){
        //s, v update
        objList[index].s.x += objList[index].v.x;
        objList[index].s.y += objList[index].v.y;
        objList[index].v.x += objList[index].a.x;
        objList[index].v.y += objList[index].a.y;
        //initialize a
        objList[index].a.x = 0.0;
        objList[index].a.y = 0.0;

        //wall collision reverses v
        if((objList[index].s.x<=param.s.x.min && objList[index].v.x<0) || (objList[index].s.x>=param.s.x.max && objList[index].v.x>=0)){
            objList[index].v.x *= -1;
        }
        if((objList[index].s.y<=param.s.y.min && objList[index].v.y<0) || (objList[index].s.y>=param.s.y.max && objList[index].v.y>=0)){
            objList[index].v.y *= -1;
        }

        for(let subindex=0; subindex<objList.length; subindex++){
            if(index!=subindex){
                //sum of gravitation acc = renewed acc                    
                objList[index].a.x += a_g(objList[index].s.x, objList[subindex].mass, objList[subindex].s.x);
                objList[index].a.y += a_g(objList[index].s.y, objList[subindex].mass, objList[subindex].s.y);
                
                //collisionCheckObjs
                if(Math.abs(objList[index].s.x - objList[subindex].s.x) <= 2*param.radius && Math.abs(objList[index].s.y - objList[subindex].s.y) <= 2*param.radius){
                    objList[index].v.x *= -1;
                    objList[subindex].v.x *= -1;
                    objList[index].v.y *= -1;
                    objList[subindex].v.y *= -1;
                }
            }
        }
        
    }
}

//constant init
radius = 15
param={
    objCount: 2,
    decimal: 2,
    radius: radius, 
    mass: {min:20, max: 20},
    s: {
        x: {min: radius, max: width-radius}, 
        y: {min: radius, max: height-radius}
    },
    v: {
        x: {min: 0, max: 0},
        y: {min: 0, max: 0}
    },
    aMagMax: 1,
    col: {min: 150, max: 255}
}

//obj sequence
function seq(){
    /*
    //logging first obj
    target = objList[0]
    console.log('')
    console.log('t:\t\t', t)
    console.log('displacement:\t', target.s)
    console.log('vel:\t\t', target.v)
    console.log('acc:\t\t', target.a)
    t+=renewInterval
    */
    objUpdate()
    objDraw()
}

//main data
let objList = [];
let t=0
const renewInterval = 50

//main
objCreate(param.objCount);
main = setInterval(seq, renewInterval)