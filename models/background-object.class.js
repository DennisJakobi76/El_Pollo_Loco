class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    world;

    /**
     * Creates a new BackgroundObject.
     *
     * @param {string} imagePath - the path to the image to use for this object
     * @param {number} x - the x position of this object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
