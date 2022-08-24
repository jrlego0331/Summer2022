/*
memos
*/

//html link
this.canvas = document.querySelector("#oscilloscope");
this.canvas.width = display.width/2;
this.canvas.height = display.height;
this.ctx = this.canvas.getContext('2d');

this.main = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    baseOSC = new oscillator.create('sine', 440);
    baseOSC.start();
    
    requestAnimationFrame(this.main);
}

this.main();