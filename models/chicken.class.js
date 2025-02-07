class Chicken extends MovableObject {
    constructor() {
        super().loadImage("../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.height = 72;
        this.width = 72;
        this.x = 200 + Math.random() * 500;
        this.y = 480 - this.height * 1.8;
    }
}
