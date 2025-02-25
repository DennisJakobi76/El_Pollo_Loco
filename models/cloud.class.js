class Cloud extends MovableObject {
    IMAGES = ["assets/img/5_background/layers/4_clouds/1.png", "assets/img/5_background/layers/4_clouds/2.png"];

    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        if (cloudCounter == 1) {
            this.x = 200;
        } else {
            this.x += 300 * cloudCounter + 2;
        }

        const randomIndex = Math.floor(Math.random() * this.IMAGES.length);
        this.img.src = this.IMAGES[randomIndex];
        cloudCounter++;
        this.y = 20;
        this.height = 250;
        this.width = 500;
        this.animate();
    }
    animate() {
        let cloudMoveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        intervalIds.push(cloudMoveLeftInterval);
    }
}
