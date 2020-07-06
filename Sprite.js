function Sprite(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.design = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.width, this.height, xCanvas, 
            yCanvas, this.width, this.height);
    }
    
}

let bg = new Sprite(0,0, 600, 600);
let spriteDoll = new Sprite(618, 16, 87, 87);