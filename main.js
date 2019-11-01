// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

class Shape {
    constructor(x, y, velX, velY, exists){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
}

// Creating Ball class
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size, exists){
        super(x, y, velX, velY, exists);
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
    };

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y + this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY
    };

    collisionDetect() {
        for (let j = 0; j < balls.length; j++){
            if(!(this === balls[j])) {
                var dx = this.x - balls[j].x;
                var dy = this.y - balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    }
}

class Evil extends Shape{
    constructor(x, y, velX, velY, color, size){
        super(x, y, velX = 20, velY = 20);
        this.color = 'white';
        this.size = 20;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.stroke();
    };

    update() {
        if ((this.x + this.size) >= width) {
            this.x -= this.size;
        }

        if ((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if ((this.y + this.size) >= height) {
            this.y -= this.size;
        }

        if ((this.y + this.size) <= 0) {
            this.y += this.size;
        }
    };

    setControls() {
        var _this = this;
        window.onkeydown = function(e) {
            if (e.keyCode === 37) {
                _this.x -= _this.velX;
              } else if (e.keyCode === 39) {
                _this.x += _this.velX;
              } else if (e.keyCode === 38) {
                _this.y -= _this.velY;
              } else if (e.keyCode === 40) {
                _this.y += _this.velY;
              }
        }
    };

    collisionDetect() {
        for (let j = 0; j < balls.length; j++){
           if(balls[j].exists === true) {
                var dx = this.x - balls[j].x;
                var dy = this.y - balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                    balls.splice(j,1);
                }
           }
        }
    }
}


var balls = [];

while (balls.length < 5) {
    var size = random(10,20);
    var ball = new Ball(
        random( 0 + size, width - size),
        random( 0 + size, width - size),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size,
        true
    );
    balls.push(ball);
}

var evilBall = new Evil (20,20,0,0,0,0);
evilBall.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

/*
    for (let i = 0; i > balls.length; i++) {
        if (balls[i].exists === true){
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }


    }
*/

    balls.forEach(function(e) {
        if (e.exists === true){
            e.draw();
            e.update();
            e.collisionDetect();
        }

    });
    evilBall.draw();
    evilBall.collisionDetect();
    evilBall.update();
    requestAnimationFrame(loop);

}

//loop();