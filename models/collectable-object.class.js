class CollectableObject extends MovableObject {
    IMAGES = ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"];

    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.offset = {
            top: 55,
            bottom: 55,
            left: 55,
            right: 55,
        };
        this.width = 160;
        this.height = 160;
        this.x = 420 + Math.random() * 800 * coinCounter;
        if (this.x > 3500) {
            this.x = 3200;
        }
        this.y = 100 + Math.random() * 130;
        coinCounter++;
        this.animate();
    }

    animate() {
        let coinBlinkInterval = setInterval(() => {
            if (!(this instanceof ThrowableObject)) {
                this.playAnimationInfinite(this.IMAGES);
            }
        }, 750);
        intervalIds.push(coinBlinkInterval);
    }
}
