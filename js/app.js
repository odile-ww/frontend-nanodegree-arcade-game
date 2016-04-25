//the score at the begining of the game
var score = 0;

//constant variables to be used for the movement of the player
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

/** 
Character superclass, which will cover common properties (x, y location and sprite) 
and method (render) of Enemy and Player subcllasses 
**/
var Character = function (x, y, sprite) {
	this.x = x;
    this.y = y;
	this.sprite = sprite;
};

// Draw the objects on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y) {
	Character.call(this, x, y);
    this.sprite = "images/enemy-bug.png";
    // randomly generates the speed of the enemies
    this.speed = Math.floor((Math.random() * 100) + 100);
};

//establishing inheritance from Character superclass
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //when bugs reach the end of the canvas
    //they respawn randomly on the left of it 
    if (this.x > 505) {
        this.x = Math.random() * -200;
    }
    // movement gets multiplied by the dt parameter
    //to ensure the game runs at same speed for all computers
    this.x += this.speed * dt;
};

// Collision detection
Enemy.prototype.checkCollisions = function() {
    if (this.x < player.x + (player.width / 4) && this.x + 25 > player.x && this.y < player.y + (player.height / 4) && this.y + 25 > player.y) {
        player.reset();
        score = 0;
        alert("You hit a bug. Try Again!");
    }
};

//the Player class - controlled by the user
var Player = function(x, y) {
	Character.call(this, x, y);
    this.sprite = "images/char-cat-girl.png";
	this.speed = 100;
    this.width = 100;
    this.height = 83;
};

//establishing inheritance from Character superclass
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) { 
};

// keyboard input handling player movements
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            if (this.x >= 50) {
                this.x -= TILE_WIDTH;
            }
            break;
        case 'up':
            if (this.y >= 50) {
                this.y -= TILE_HEIGHT;
            } else {
                alert("You win!"); // the player wins if the avatar reaches the water
                this.reset();
                score += 10;
            }
            break;
        case 'right':
            if (this.x < 505 - this.width) {
                this.x += TILE_WIDTH;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += TILE_HEIGHT;
            } else if (this.y + this.height > 606) {
                this.y = 400;
            } else {
                this.y = this.y;
            }
            break;
    }
};

// method that resets player's position upon winning or hitting a bug
Player.prototype.reset = function() {
    this.x = 207;
    this.y = 400;
};

// Now instantiate your objects.

// Place the player object in a variable called player
var player = new Player(207, 400);
console.log("player.x, player.y")
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-200, 55);
var enemy2 = new Enemy(-50, 140);
var enemy3 = new Enemy(-100, 230);
var enemy4 = new Enemy(-400, 300);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//function to draw the score on the canvas
function drawScore() {
    ctx.font = "24px Comic Sans MS";
    ctx.fillStyle = "#006699";
    ctx.fillText("Score: " + score, 202, 25);
}