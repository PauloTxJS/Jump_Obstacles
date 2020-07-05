let canvas;
let ctx;
let height;
let width;
let frames = 0;
let maxJump = 3;
let velocity = 6;
let currentState;

let states = {
    play: 0,
    playing: 1,
    lose: 2
}

let floor = {
    y: 550,
    height: 50,
    color: "#e8da78",

    design: function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.y, width, this.height);
    }
}

block = {
    x: 50,
    y: 0,
    height:50,
    width:50,
    color: "#ff9239",
    gravity: 1.6,
    velocity: 0,
    jumpForce: 23.6,
    amountJump: 0,

    reload: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > (floor.y - this.height) && currentState !== states.lose) {
            this.y = floor.y - this.height;
            this.amountJump = 0;
            this.velocity = 0;
        }
    },

    jump: function() {
        if (this.amountJump < maxJump) {
            this.velocity = -this.jumpForce;
            this.amountJump++;
        }
    },

    design: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.height, this.width);
    }
},

obstacles = {
    _obs: [],
    colors: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
    timerInsert: 0,

    insert: function() {
        this._obs.push({
            x: width,
            width: 30 + Math.floor(21 * Math.random()),
            height: 30 + Math.floor(120 * Math.random()),
            color: this.colors[Math.floor(5 * Math.random())]
        });

        this.timerInsert = 30 + Math.floor(21 * Math.random());
    },

    reload: function() {
        if (this.timerInsert === 0) {
            this.insert();
        } else {
            this.timerInsert--;
        }

        for (let i = 0, size = this._obs.length; i < size; i++) {
            let obs = this._obs[i];
            obs.x -= velocity;

            if (block.x < (obs.x + obs.width) && (block.x + block.width) >= obs.x && (block.y + block.height) >= (floor.y - obs.height)) {
                currentState = states.lose;
            } else if (obs.x <= -obs.width) {
                this._obs.splice(i, 1);
                size--;
                i--;
            } 
        }
    },

    clear: function() {
        this._obs = [];
    },

    design: function() {
        for (let i = 0, size = this._obs.length; i < size; i++) {
            let obs = this._obs[i];
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, floor.y - obs.height, obs.width, obs.height);
        }
    }
};

function click(event) {
    if (currentState === states.playing) {
        block.jump();
    } else if (currentState === states.play) {
        currentState = states.playing;
    } else if (currentState === states.lose && block.y >= (2 * height)) {
        currentState = states.play;
        block.velocity = 0;
        block.y = 0;    
    }   
}

function main() {
    height = window.innerHeight;
    width = window.innerWidth;

    if (width >= 500) {
        width = 600;
        height = 600;
    }

    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", click);

    currentState = states.play;
    run();
}

function run() {
    reload();
    design();
    window.requestAnimationFrame(run);
}

function reload() {
    frames++;
    block.reload();
    
    if (currentState === states.playing) {
        obstacles.reload();
    } else if (currentState === states.lose) {
        obstacles.clear();
    } 
}

function design() {
    ctx.fillStyle = "#80daff";
    ctx.fillRect(0, 0, width, height);
    
    if (currentState === states.play) {
        ctx.fillStyle = "green";
        ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);
    } else if (currentState === states.lose) {
        ctx.fillStyle = "red";
        ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);
    } else if (currentState === states.playing) {
        obstacles.design();
    }
    
    floor.design();
    block.design();

}

main();