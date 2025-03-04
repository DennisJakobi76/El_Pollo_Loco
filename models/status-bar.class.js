class StatusBar extends DrawableObject {
    percentage = 100;
    world;
    x = 20;
    y = 0;
    height = 60;
    width = 200;
    IMAGES = [];

    /**
     * Creates a new StatusBar.
     *
     * Sets the initial percentage of the status bar to 100.
     * The status bar is positioned at x = 20 and y = 0 on the screen.
     * The images for the status bar are loaded at construction time.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
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
