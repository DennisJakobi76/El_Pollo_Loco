class StatusBar extends DrawableObject {
    /**
     * Creates a new StatusBar.
     *
     * Sets the initial percentage of the status bar to 100.
     * The status bar is positioned at x = 20 and y = 0 on the screen.
     * The images for the status bar are loaded at construction time.
     */
    constructor() {
        super();
        this.IMAGES = [];
        this.loadImages(this.IMAGES);
        this.percentage = 100;
        this.world;
        this.x = 20;
        this.y = 0;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar.
     * @param {number} percentage - The new percentage of the status bar, between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to use based on the status bar's percentage.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        return Math.floor(this.percentage / 20);
    }
}
