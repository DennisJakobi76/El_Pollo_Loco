class BackgroundObject extends MovableObject {
    /**
     * Creates a new BackgroundObject.
     *
     * @param {string} imagePath - the path to the image to use for this object
     * @param {number} x - the x position of this object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.width = 720;
        this.height = 480;
        this.world;

        this.x = x;
        this.y = 480 - this.height;
    }
}
