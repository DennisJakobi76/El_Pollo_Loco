class StatusBar extends DrawableObject {
    constructor() {
        super();
        this.IMAGES = [];
        this.loadImages(this.IMAGES);
        this.percentage = 100;

        this.world;
        this.x = 60;
        this.y = 0;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        return Math.floor(this.percentage / 20);
    }
}
