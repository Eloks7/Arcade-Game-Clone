// Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > 505) {
            this.x = -10;
        }

        if (player.x < this.x + 50.5 &&
            player.x + 50.5 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            player.x = 210;
            player.y = 400;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        // this.speed = speed;
    }

    update() {
        // stop player from going off canvas
        if (this.x > 400) {
            this.x = 400;
        }        
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 400) {
            this.y = 400;
        }

        if (this.y < 0) {
            player.y = 400;
            player.x = 210;
        };

        // check for collision
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + 50.5 > this.x && enemy.x < this.x + 50.5)){
                this.x = 210;
                this.y = 400;
            }
        }


    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(allowedKeys) {
        switch (allowedKeys) {
            case 'left':
                this.x -= 100;
                break;
            case 'right':
                this.x += 100;
                break;
            case 'down':
                this.y += 83;
                break;
            case 'up':
                this.y -= 83;
                break;
            
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [ new Enemy(0, 60, 220), new Enemy(0, 145, 300), new Enemy(0, 230, 430)];
let player = new Player(210, 400);


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
  