// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    //Location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // the speed of enemy movement, dependent on your device
    this.x += this.speed*dt;
    //When enemies run out of the border, get them move again.
    //the latency between two enemies dependent on their speed ( latency = 200/RealSpeed);
    if (this.x > 505) {
        this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The role we control
var Player = function (x,y) {
    // The position of our Role
    this.x = x;
    this.y = y;
    this.currentRole = 0;
    this.sprite = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
};

// Detect if our role is in the border
Player.prototype.borderDetect = function () {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 404) {
        this.x = 404;
    }
    if (this.y > 387) {
        this.y = 387;
    }

    if (this.y < 54) {
        this.x = 202;
        this.y = 83*5-28;
    }
};
// Detect if role is in collision with enemy
Player.prototype.collisionDetect = function () {
    allEnemies.forEach(function (enemy) {
        if ( Math.abs(this.x - enemy.x) < 80 && Math.abs(this.y - enemy.y) < 83) {
            this.x = 202;
            this.y = 83*5-28;
        }
    },this)
};
Player.prototype.update = function () {

    this.borderDetect();
    this.collisionDetect();
};

// When player press keyboard,move one box
Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left":
            this.x -= 101;
            break;
        case "right":
            this.x += 101;
            break;
        case "up":
            this.y -= 83;
            break;
        case "down":
            this.y += 83;
            break;
        case "x":
            this.currentRole++;
            this.currentRole %= 5;
            break;
        default:
            break;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite[this.currentRole]),this.x, this.y);
};

// Initialization. Set Player and Enemies
var allEnemies = [];
for(var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(0,(i+1)*83-28,(3-i)*80+100));
}

var player = new Player(202,83*5-28);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        88: 'x'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});