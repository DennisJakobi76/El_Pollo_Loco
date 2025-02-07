class Character extends MovableObject {
    height;
    width;
    y;
    IMAGES_WALKING = [
        "../assets/img/2_character_pepe/2_walk/W-21.png",
        "../assets/img/2_character_pepe/2_walk/W-22.png",
        "../assets/img/2_character_pepe/2_walk/W-23.png",
        "../assets/img/2_character_pepe/2_walk/W-24.png",
        "../assets/img/2_character_pepe/2_walk/W-25.png",
        "../assets/img/2_character_pepe/2_walk/W-26.png",
    ];
    currentImage = 0;
    constructor() {
        super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.height = 240;
        this.width = 124;
        this.y = 480 - this.height * 1.22;
        this.animate();
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

    jump() {}
}
