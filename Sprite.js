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

let lose = new Sprite(603, 478, 397, 358);
let play = new Sprite(603, 127, 397, 347);
let newN = new Sprite(68, 721, 287, 93);
let spriteRecord = new Sprite(28, 879, 441, 95);
let spriteFloor = new Sprite(0, 604, 600, 54);

let redObstacle = new Sprite(662, 867, 50, 120);
let pinkObstacle = new Sprite(719, 867, 50, 120);
let blueObstacle = new Sprite(779, 867, 50, 120);
let greenObstacle = new Sprite(839, 867, 50, 120);
let yellowObstacle = new Sprite(898, 867, 50, 120);