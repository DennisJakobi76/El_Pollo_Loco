class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud(), new Cloud()];
    backgroundObjects = [new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", 0, 280)];
    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.character);
        this.addObjectsFromArrayToMap(this.enemies);
        this.addObjectsFromArrayToMap(this.clouds);
        this.addObjectsFromArrayToMap(this.backgroundObjects);
        requestAnimationFrame(this.draw.bind(this));
    }

    addObjectsFromArrayToMap(array) {
        array.forEach((object) => this.addToMap(object));
    }
    addToMap(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }
}
