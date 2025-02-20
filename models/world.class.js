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
    bottlesAtStart = [];
    collectedCoins = 0;
    collectedBottles = 0;
    lastCollisionTime = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.addBottlesToArray(this.bottlesAtStart, 10);
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
        this.addObjectsFromArrayToMap(this.bottlesAtStart);
        this.addObjectsFromArrayToMap(this.bottles);
        this.addObjectsFromArrayToMap(this.level.enemies);

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

    handleCollisionWithCharacter(enemy) {
        if (this.character.isColliding(enemy) && !enemy.killed) {
            if (this.character.checkCharacterJumpAttacks() && !(enemy instanceof SmallChicken) && !(enemy instanceof Endboss)) {
                this.killOneEnemy(enemy);
            } else {
                const currentTime = new Date().getTime();
                if (currentTime - this.lastCollisionTime > 1000) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                    this.lastCollisionTime = currentTime;
                }
            }
        }
    }

    showDyingChicken(enemy) {
        if (enemy.dyingAnimationCounter == 0) {
            enemy.playChickenDyingAnimation();
            enemy.dyingAnimationCounter++;
            enemy.stopAnimation();
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 1000);
        }
    }

    showSplashingBottle(bottle) {
        bottle.playBottleSplashAnimation();
        setTimeout(() => {
            this.bottles.splice(this.bottles.indexOf(bottle), 1);
        }, 350);
    }

    killOneEnemy(enemy) {
        if (enemy instanceof Chicken) {
            enemy.killed = true;
            this.showDyingChicken(enemy);
        } else if (enemy instanceof Endboss) {
            enemy.hit();
        }
    }

    handleCollisionWithBottle(enemy, bottle) {
        if (bottle.isColliding(enemy) && !enemy.killed && !bottle.lyingOnTheGround) {
            this.showSplashingBottle(bottle);
            this.killOneEnemy(enemy);
            // this.bottleBar.setPercentage(this.bottles.length);
        }
    }
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.handleCollisionWithCharacter(enemy);
            this.bottles.forEach((bottle) => {
                this.handleCollisionWithBottle(enemy, bottle);
            });
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
        this.bottlesAtStart.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 100) {
                    this.bottlesAtStart.splice(this.bottlesAtStart.indexOf(bottle), 1);
                    this.collectedBottles += 20;
                    this.bottleBar.setPercentage(this.collectedBottles);
                }
            }
        });
    }

    run() {
        let worldCheckCollisionsInterval = setInterval(() => {
            this.checkCollisions();
        }, 50);

        let worldRunInterval = setInterval(() => {
            this.checkThrowObjects();
        }, 150);
        let worldCheckPickUpCoinsInterval = setInterval(() => {
            this.pickUpCollectables();
        }, 50);

        intervalIds.push(worldCheckCollisionsInterval);
        intervalIds.push(worldRunInterval);
        intervalIds.push(worldCheckPickUpCoinsInterval);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.collectedBottles > 0) {
                let bottle;
                if (this.character.otherDirection) {
                    bottle = new ThrowableObject(this.character.x - 12, this.character.y + 120);
                } else {
                    bottle = new ThrowableObject(this.character.x + 82, this.character.y + 120);
                }
                this.bottles.push(bottle);
                this.handleThrownBottle();
            }
        }
    }

    handleThrownBottle() {
        if (this.collectedBottles > 0) {
            this.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.collectedBottles);
        }
    }

    addBottlesToArray(array, bottleCounter) {
        for (let i = 0; i < bottleCounter; i++) {
            array.push(new ThrowableObject(Math.floor(Math.random() * 2000) + 200, 365));
        }
    }
}
