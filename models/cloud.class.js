class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    world;

    constructor() {
        super().loadImage("../assets/img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 600;
        this.animate();
    }
    animate() {
        this.moveLeft();
    }
}
