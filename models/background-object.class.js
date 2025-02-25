class BackgroundObject extends MovableObject {
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.width = 720;
        this.height = 480;
        this.world;

        this.x = x;
        this.y = 480 - this.height;
    }
}
