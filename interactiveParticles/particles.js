//html const settings
const mainCanvas = document.querySelector('#mainCanvas');
const width = mainCanvas.width;
const height = mainCanvas.height;

//random related func
function randomFloat(min, max, decimal=param.decimal){
    return parseFloat(((max-min)*Math.random()+min).toFixed(decimal));
}

function randomCol(min=180, max=255){
    return [parseInt((max-min)*Math.random()+min), parseInt((max-min)*Math.random()+min), parseInt((max-min)*Math.random()+min)];
}

//physics related func
function a_g(selfS, targetMass, targetS, G=6.67*(10**-11)){
    if(targetS.x-selfS.x>=0){x=G*targetMass/((targetS.x-selfS.x)**2);}
    else{x=-G*targetMass/((targetS.x-selfS.x)**2);}
    if(targetS.y-selfS.y>=0){y=G*targetMass/((targetS.y-selfS.y)**2);}
    else{y=-G*targetMass/((targetS.y-selfS.y)**2);}
    return {x: x, y: y};

}

//obj related func
function objDraw(){
    const ctx = mainCanvas.getContext("2d");
    
    for (let index=0; index<objList.length; index++) {
        ctx.fillStyle="rgb("+String(objList[index].col)+")";
        ctx.beginPath();
        ctx.arc(objList[index].s.x, objList[index].s.y, param.radius, 0, 2*Math.PI);
        ctx.fill();
    }
}

function objCreate(count){
    for(let i = 0; i<count; i++){
        let obj = {
            mass: randomFloat(param.m.min, param.m.max),
            s:{
                x: randomFloat(param.s.x.min, param.s.x.max, 0),
                y: randomFloat(param.s.y.min, param.s.y.max, 0)
            },
            v: {
                x: randomFloat(param.v.x.min, param.v.x.max), 
                y: randomFloat(param.v.y.min, param.v.y.max)
            },
            a: {
                x: randomFloat(param.a.x.min, param.a.x.max),
                y: randomFloat(param.a.y.min, param.a.y.max)
            },
            col: randomCol()
        }
        objList.push(obj);
    }
}

function objUpdate(){
    for(let index=0; index<objList.length; index++){
        objList[index].s.x+=objList[index].v.x;
        objList[index].s.y+=objList[index].v.y;
        objList[index].v.x+=objList[index].a.x;
        objList[index].v.y+=objList[index].a.y;
        
        //collisionCheckWall

        /*
        for(let subindex=0; subindex<objList.length; subindex++){
            if(index != subindex){
                objList[index].a.x+=a_g(objList[subindex].s, objList[subindex].mass, objList[subindex].s).x;
                objList[index].a.y+=a_g(objList[subindex].s, objList[subindex].mass, objList[subindex].s).y;
            //collisionCheckObjs
            }        
        }
        */
    }
}

//constant init
radius = 10
param={
    decimal: 2,
    radius: radius, 
    m: {min: 1, max: 5},
    s: {
        x: {min: radius, max: width-radius}, 
        y: {min: radius, max: height-radius}
    },
    v: {
        x: {min: -5, max: 5},
        y: {min: -5, max: 5}
    },
    a: {
        x: {min: 0, max: 0},
        y: {min: 0, max: 0}
    }
}

//main data
let objList = [];
const objCount = 1
let t = 0
const renewInterval = 500

//obj sequence
function seq(){
    //logging last obj
    target = objList[-1]
    console.log('-'*25, t,'ms:')
    console.log('displacement: ', target.s)
    console.log('vel: ', target.vel)
    console.log('acc: ', target.acc)

    objUpdate()
    objDraw()
    t+=renewInterval
}

objCreate(objCount);

setInterval(seq(), renewInterval)