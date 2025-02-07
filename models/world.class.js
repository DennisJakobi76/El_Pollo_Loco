class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject("../assets/img/5_background/layers/air.png", 0),
        new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", 0),
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
        this.enemies.forEach((enemy) => (enemy.world = this));
        this.clouds.forEach((cloud) => (cloud.world = this));
        this.backgroundObjects.forEach((object) => (object.world = this));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsFromArrayToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsFromArrayToMap(this.enemies);
        this.addObjectsFromArrayToMap(this.clouds);

        requestAnimationFrame(this.draw.bind(this));
    }

    addObjectsFromArrayToMap(array) {
        array.forEach((object) => this.addToMap(object));
    }
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
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
}
