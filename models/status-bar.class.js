class StatusBar extends DrawableObject {
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage > 80) return 4 + (this.percentage === 100);
        return Math.floor(this.percentage / 20);
    }
}
