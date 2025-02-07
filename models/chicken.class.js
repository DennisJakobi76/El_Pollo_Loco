class Chicken extends MovableObject {
    IMAGES_WALKING = [
        "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    currentImage = 0;
    constructor() {
        super().loadImage("../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.height = 72;
        this.width = 72;
        this.x = 200 + Math.random() * 500;
        this.y = 480 - this.height * 1.8;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);

        this.moveLeft();
    }
}
