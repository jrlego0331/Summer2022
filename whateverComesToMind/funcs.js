function color(){
    this.rgb = function(red, green, blue){return 'rgb('+red+','+green,','+blue+')';}
    this.rgba = function(red, green, blue, attenuation=1.0){return 'rgb('+red+','+green+','+blue+','+attenuation+')';}
    this.text = function(text){return text;}
}

function vec(vector){
    this.magnitude=function(){return ((vector.x**2)+(vector.y**2))**0.5;}
    this.direction=function(){return Math.atan(vector.y/vector.x);}
}

function degToRad(deg){return (2*Math.PI)*(deg/360);}
function radToDeg(rad){return 360*(rad/(2*Math.PI));}

function draw(canvas, ctx){
    this.blank=function(col, lineWidth){
        ctx.beginPath();
        ctx.arc(0.5*canvas.width, 0.5*canvas.height, 0.25*canvas.height, 0*Math.PI, 2*Math.PI, true);
        ctx.moveTo(0.5*canvas.width-0.3*canvas.height, 0.5*canvas.height-0.3*canvas.height);
        ctx.lineTo(0.5*canvas.width+0.3*canvas.height, 0.5*canvas.height+0.3*canvas.height);
        ctx.strokeStyle = col;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

function oscillator(){
    this.create = function(type, hz){
        newOsc = audioCtx.createOscillator();
        newOsc.type(type);
        newOsc.frequency.setValueAtTime(hz, audioCtx.currentTime);
        newOsc.connect(audioCtx.destination);
        return newOsc;
    }
}