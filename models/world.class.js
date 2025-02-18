class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBarHealth();
    coinBar = new StatusBarCoin();
    bottleBar = new StatusBarBottle();
    bottles = [];
    collectedCoins = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsFromArrayToMap(this.level.backgroundObjects);
        this.addObjectsFromArrayToMap(this.level.clouds);
        this.addObjectsFromArrayToMap(this.level.coins);
        this.addObjectsFromArrayToMap(this.level.enemies);
        this.addObjectsFromArrayToMap(this.bottles);

        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(this.draw.bind(this));
    }

    addObjectsFromArrayToMap(array) {
        array.forEach((object) => this.addToMap(object));
    }
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        //TODO - entfernen, wenn nicht mehr benötigt
        // movableObject.drawFrame(this.ctx);
        // movableObject.drawOffset(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    pickUpCollectables() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.collectedCoins += 20;
                this.coinBar.setPercentage(this.collectedCoins);
            }
        });
    }

    run() {
        let worldRunInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
        let worldCheckPickUpCoinsInterval = setInterval(() => {
            this.pickUpCollectables();
        }, 50);
        intervalIds.push(worldRunInterval);
        intervalIds.push(worldCheckPickUpCoinsInterval);
    }
    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle;
            if (this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x - 12, this.character.y + 120);
            } else {
                bottle = new ThrowableObject(this.character.x + 82, this.character.y + 120);
            }

            this.bottles.push(bottle);
        }
    }
}
