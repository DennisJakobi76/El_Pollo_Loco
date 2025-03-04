class World {
    camera_x = 0;
    bottles = [];
    bottlesAtStart = [];
    collectedCoins = 0;
    collectedBottles = 0;
    lastCollisionTime = 0;
    /**
     * Initializes a new World object with the given parameters.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game on.
     * @param {Keyboard} keyboard - The Keyboard object to handle user input.
     *
     * This method sets up the game world by initializing the character, the level, the health and coin bars, and the bottles.
     * It then starts the game loop by calling the draw and run methods.
     */
    constructor(canvas, keyboard) {
        this.character = new Character();
        this.endBoss = null;
        this.level = initLevel();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.healthBar = new StatusBarHealth();
        this.coinBar = new StatusBarCoin();
        this.bottleBar = new StatusBarBottle();
        this.addBottlesToArray(this.bottlesAtStart, 10);
        this.endBoss = this.level.enemies[this.level.enemies.length - 1];
        this.draw();
        this.setWorld();
        gameMusic.play();
        this.run();
    }

    /**
     * Sets the world of the character to this World object.
     * This is necessary to give the character access to the world's objects and methods.
     */
    setWorld() {
        this.character.world = this;
    }

    drawMovingObjects() {
        this.addObjectsFromArrayToMap(this.level.backgroundObjects);
        this.addObjectsFromArrayToMap(this.level.clouds);
        this.addObjectsFromArrayToMap(this.level.coins);
        this.addObjectsFromArrayToMap(this.bottlesAtStart);
        this.addObjectsFromArrayToMap(this.bottles);
        this.addObjectsFromArrayToMap(this.level.enemies);
    }

    drawFixedObjects() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    }

    /**
     * Renders all game objects onto the canvas and updates the display in each frame.
     *
     * This method clears the canvas and then sequentially draws various game objects,
     * including background objects, clouds, coins, bottles, enemies, and fixed UI elements
     * such as health, coin, and bottle bars. The character is rendered with respect to
     * the current camera position, allowing for a dynamic scrolling effect. The method
     * utilizes requestAnimationFrame to continuously update and redraw the game world.
     */

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawMovingObjects();
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects
        this.drawFixedObjects();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(this.draw.bind(this));
    }

    /**
     * Calls the addToMap method for each object in the given array.
     * This can be used to render all objects in an array onto the canvas.
     * @param {array} array - The array of objects to be drawn.
     */
    addObjectsFromArrayToMap(array) {
        array.forEach((object) => this.addToMap(object));
    }
    /**
     * Draws the given movableObject onto the canvas at its current x and y position.
     * If the object is facing the other direction, it will be flipped horizontally
     * before drawing and flipped back after drawing.
     * @param {MovableObject} movableObject - The object to be drawn.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips the given movableObject horizontally around its center by applying a transformation
     * to the canvas context. The object's x position is also adjusted accordingly.
     * The canvas context is saved before applying the transformation, so it can be restored
     * afterwards.
     * @param {MovableObject} movableObject - The object to be flipped.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the canvas context to its previous state by popping the most recently
     * saved state off the stack and restoring the values of the context's properties
     * to their values at the time of the save, and flips the given movableObject back
     * horizontally by applying a transformation to the canvas context. The object's
     * x position is also adjusted accordingly.
     * @param {MovableObject} movableObject - The object to be restored.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if the character is getting hit by an enemy and handles the
     * consequences if true. If the character was hit more than a second ago,
     * the character is hit again and the health bar is updated.
     */
    handleCharacterGettingHit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastCollisionTime > 1000) {
            characterHitSound.play();
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
            this.lastCollisionTime = currentTime;
        }
    }

    /**
     * Handles the collision between the character and an enemy.
     * If the character is colliding with an enemy and the enemy is not killed,
     * it checks if the character is performing a jump attack.
     * If the character is jump attacking and the enemy is not a SmallChicken or Endboss,
     * the enemy is killed. Otherwise, it handles the character getting hit.
     *
     * @param {Object} enemy - The enemy object to check collision with.
     */

    handleCollisionWithCharacter(enemy) {
        if (this.character.isColliding(enemy) && !enemy.killed) {
            if (this.character.checkCharacterJumpAttacks() && !(enemy instanceof SmallChicken) && !(enemy instanceof Endboss)) {
                this.killOneEnemy(enemy);
            } else {
                this.handleCharacterGettingHit();
            }
        }
    }

    /**
     * Shows the dying animation of a chicken by stopping the chicken's
     * animation, playing the dying animation, and removing the chicken
     * from the enemies array after a delay of 1000 milliseconds.
     * The dying animation is only played if the chicken is not already
     * dying.
     * @param {Object} enemy - The chicken object to show the dying animation for.
     */
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

    /**
     * Displays the bottle splash animation by invoking the playBottleSplashAnimation
     * method on the bottle object. After a delay, it removes the bottle from the
     * bottles array to ensure it no longer affects the game state.
     *
     * @param {ThrowableObject} bottle - The bottle object to show the splash animation for.
     */

    showSplashingBottle(bottle) {
        bottle.playBottleSplashAnimation();
        setTimeout(() => {
            this.bottles.splice(this.bottles.indexOf(bottle), 1);
        }, 350);
    }

    /**
     * Kills one enemy by setting the enemy's killed state to true if the enemy is a Chicken
     * and plays the chicken hit sound effect. If the enemy is an Endboss, it plays the senioraGallinaHitSound
     * and calls the hit method of the Endboss object.
     * The enemy is killed if it is not already killed.
     * @param {Object} enemy - The enemy object to kill.
     */
    killOneEnemy(enemy) {
        if (enemy instanceof Chicken) {
            enemy.killed = true;
            chickenHitSound.play();
            this.showDyingChicken(enemy);
        } else if (enemy instanceof Endboss) {
            senioraGallinaHitSound.play();
            enemy.hit();
        }
    }

    /**
     * Handles the collision between a bottle and an enemy.
     * If the bottle collides with an enemy and the enemy is not already killed
     * and the bottle is not lying on the ground, it plays the bottle splash sound,
     * shows the bottle splash animation, and kills the enemy.
     *
     * @param {Object} enemy - The enemy object to check collision with.
     * @param {ThrowableObject} bottle - The bottle object involved in the collision.
     */

    handleCollisionWithBottle(enemy, bottle) {
        if (bottle.isColliding(enemy) && !enemy.killed && !bottle.lyingOnTheGround) {
            bottleSplashSound.play();
            this.showSplashingBottle(bottle);
            this.killOneEnemy(enemy);
        }
    }
    /**
     * Iterates over all enemies and bottles in the current level, checking for collisions
     * between the character and each enemy, as well as between each bottle and enemy.
     * Handles character and bottle collisions accordingly by invoking the appropriate
     * methods to manage collision consequences such as playing sounds, animations, and
     * updating the game state.
     */

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.handleCollisionWithCharacter(enemy);
            this.bottles.forEach((bottle) => {
                this.handleCollisionWithBottle(enemy, bottle);
            });
        });
    }

    /**
     * Handles the collision between the character and coins in the level.
     * When a collision is detected, the coin is removed from the level,
     * the pick-up sound is played, the collected coins count is increased,
     * and the coin bar is updated to reflect the new total.
     */

    handleCharacterCollidingWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                pickUpItemSound.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.collectedCoins += 20;
                this.coinBar.setPercentage(this.collectedCoins);
            }
        });
    }

    /**
     * Handles the collision between the character and the bottles at the start of the level.
     * When a collision is detected, the bottle is removed from the level, the pick-up sound is played,
     * the collected bottles count is increased, and the bottle bar is updated to reflect the new total.
     */
    handleCharacterCollidingWithInitialBottles() {
        this.bottlesAtStart.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 100) {
                    pickUpItemSound.play();
                    this.bottlesAtStart.splice(this.bottlesAtStart.indexOf(bottle), 1);
                    this.collectedBottles += 20;
                    this.bottleBar.setPercentage(this.collectedBottles);
                }
            }
        });
    }

    /**
     * Handles the collision between the character and bottles that have been thrown
     * and are lying on the ground. When a collision is detected, the bottle is removed
     * from the level, the pick-up sound is played, the collected bottles count is increased,
     * and the bottle bar is updated to reflect the new total.
     */
    handleCharacterCollidingWithBottlesOnGroundAfterThrowing() {
        this.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && bottle.lyingOnTheGround) {
                if (this.collectedBottles < 100 && this.bottles.length > 0) {
                    pickUpItemSound.play();
                    this.bottles.splice(this.bottles.indexOf(bottle), 1);
                    this.collectedBottles += 20;
                    this.bottleBar.setPercentage(this.collectedBottles);
                }
            }
        });
    }

    /**
     * Manages the collection of items by the character. It checks for collisions
     * between the character and coins, initial bottles, and bottles on the ground
     * after being thrown. When a collision is detected, the corresponding item is
     * removed from the level, a pick-up sound is played, and the collected item
     * count is updated accordingly.
     */

    pickUpCollectables() {
        this.handleCharacterCollidingWithCoin();
        this.handleCharacterCollidingWithInitialBottles();
        this.handleCharacterCollidingWithBottlesOnGroundAfterThrowing();
    }

    /**
     * Initializes the interval for checking collisions between the character, bottles, and enemies.
     * The interval is set to call checkCollisions() every 50 milliseconds.
     * The interval ID is stored in the intervalIds array to be cleared later.
     */
    initializeCheckCollisionsInterval() {
        let worldCheckCollisionsInterval = setInterval(() => {
            this.checkCollisions();
        }, 50);
        intervalIds.push(worldCheckCollisionsInterval);
    }

    /**
     * Initializes the interval for checking and handling throw objects.
     * The interval is set to call checkThrowObjects() every 150 milliseconds.
     * The interval ID is stored in the intervalIds array to be cleared later.
     */

    initializeCheckThrowingInterval() {
        let worldcheckThrowObjectsInterval = setInterval(() => {
            this.checkThrowObjects();
        }, 150);
        intervalIds.push(worldcheckThrowObjectsInterval);
    }

    /**
     * Initializes the interval for checking and handling character's picking up of coins, initial bottles and bottles on the ground.
     * The interval is set to call pickUpCollectables() every 50 milliseconds.
     * The interval ID is stored in the intervalIds array to be cleared later.
     */
    initializeCheckPickUpInterval() {
        let worldCheckPickUpCoinsInterval = setInterval(() => {
            this.pickUpCollectables();
        }, 50);
        intervalIds.push(worldCheckPickUpCoinsInterval);
    }

    /**
     * Initializes the interval for checking the proximity of the character to the Endboss.
     * The interval is set to call checkCharacterNearEndboss() every 50 milliseconds.
     * The interval ID is stored in the intervalIds array to be cleared later.
     */

    initializeCharacterNearEndbossInterval() {
        let worldCheckCharacterNearEndbossInterval = setInterval(() => {
            this.checkCharacterNearEndboss();
        }, 50);
        intervalIds.push(worldCheckCharacterNearEndbossInterval);
    }

    /**
     * Initializes the interval for checking if the character is behind the Endboss.
     * The interval is set to call checkCharacterBehindEndboss() every 50 milliseconds.
     * The interval ID is stored in the intervalIds array to be cleared later.
     */
    initializeCharacterBehindEndbossInterval() {
        let worldCheckCharacterBehindEndbossInterval = setInterval(() => {
            this.checkCharacterBehindEndboss();
        }, 50);
        intervalIds.push(worldCheckCharacterBehindEndbossInterval);
    }
    /**
     * Initializes all intervals for checking collisions, character throwing, picking up collectables, proximity to Endboss, and whether character is behind Endboss.
     * The intervals are used to control the game's logic and are cleared when the game is over.
     */
    run() {
        this.initializeCheckCollisionsInterval();
        this.initializeCheckThrowingInterval();
        this.initializeCheckPickUpInterval();
        this.initializeCharacterNearEndbossInterval();
        this.initializeCharacterBehindEndbossInterval();
    }

    /**
     * Checks if the character is near the Endboss and whether it is close enough to attack.
     * The method sets the nearCharacter, notCloseEnoughToAttackCharacter, and characterInAttackRange properties of the Endboss.
     * The properties are based on the distance between the character and the Endboss, which is calculated by taking the absolute
     * difference between the character's x position plus its right offset and the Endboss's x position minus its left offset.
     * The distance is then used to determine if the character is near the Endboss, if it is close enough to attack the Endboss, and
     * if it is in the Endboss's attack range.
     */
    checkCharacterNearEndboss() {
        let distanceCharacterToEndboss = Math.abs(this.character.x + this.character.offset.right - (this.endBoss.x - this.endBoss.offset.left));
        distanceCharacterToEndboss <= 450 && distanceCharacterToEndboss >= 350 ? (this.endBoss.nearCharacter = true) : (this.endBoss.nearCharacter = false);
        distanceCharacterToEndboss < 350 && distanceCharacterToEndboss >= 3 ? (this.endBoss.notCloseEnoughToAttackCharacter = true) : (this.endBoss.notCloseEnoughToAttackCharacter = false);
        distanceCharacterToEndboss < 3 ? (this.endBoss.characterInAttackRange = true) : (this.endBoss.characterInAttackRange = false);
    }

    /**
     * Checks if the character is behind the Endboss and whether the Endboss should face the other direction.
     * The method sets the characterIsBehindEndboss and otherDirection properties of the Endboss.
     * The properties are based on the distance between the character's left offset and the Endboss's right offset.
     * The distance is then used to determine if the character is behind the Endboss and if the Endboss should face the other direction.
     */
    checkCharacterBehindEndboss() {
        if (this.character.x - this.character.offset.left > this.endBoss.x + this.endBoss.offset.right) {
            this.endBoss.characterIsBehindEndboss = true;
            this.endBoss.otherDirection = true;
        } else {
            this.endBoss.characterIsBehindEndboss = false;
            this.endBoss.otherDirection = false;
        }
    }

    /**
     * Checks if the character is pressing the D key and if a bottle has not been thrown yet.
     * If both conditions are true, a new ThrowableObject is created and added to the bottles array.
     * The bottle is positioned at the character's x coordinate plus or minus an offset depending on the character's direction.
     * The characterHasThrownOneBottle flag is set to true, the throwBottleSound is played, and the handleThrownBottle method is called.
     */
    checkThrowObjects() {
        if (this.keyboard.D && !characterHasThrownOneBottle) {
            if (this.collectedBottles > 0) {
                let bottle;
                if (this.character.otherDirection) {
                    bottle = new ThrowableObject(this.character.x - 12, this.character.y + 120);
                    characterHasThrownOneBottle = true;
                } else {
                    bottle = new ThrowableObject(this.character.x + 82, this.character.y + 120);
                    characterHasThrownOneBottle = true;
                }
                this.bottles.push(bottle);
                throwBottleSound.play();
                this.handleThrownBottle();
            }
        }
    }

    /**
     * Updates the collected bottles count and the bottle bar when a bottle is thrown.
     * If there are collected bottles, it decreases the count by 20 and updates the bottle bar
     * to reflect the new percentage. This function is used to handle the logic of reducing
     * the number of collected bottles after a bottle is thrown.
     */

    handleThrownBottle() {
        if (this.collectedBottles > 0) {
            this.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.collectedBottles);
        }
    }

    /**
     * Adds a specified number of bottles to a given array at random x positions within the level.
     * Each bottle is positioned at y = 365, and the x position is a random number between 200 and 2200.
     * @param {array} array - The array to add the bottles to.
     * @param {number} bottleCounter - The number of bottles to add.
     */
    addBottlesToArray(array, bottleCounter) {
        for (let i = 0; i < bottleCounter; i++) {
            array.push(new ThrowableObject(Math.floor(Math.random() * 2000) + 200, 375));
        }
    }
}
