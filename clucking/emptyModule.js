/*
memos
*/

//html link
this.canvas = document.querySelector("#emptyModule");
this.canvas.width = display.width/4;
this.canvas.height = display.height;
this.ctx = this.canvas.getContext('2d');

this.main = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new draw(this.canvas, this.ctx).blank('grey', 2);
    requestAnimationFrame(this.main);
}

this.main();