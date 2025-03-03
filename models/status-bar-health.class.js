class StatusBarHealth extends StatusBar {
    IMAGES = [
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ];

    /**
     * Creates a new StatusBarHealth.
     * Sets the y position of the health bar to 84 and sets the percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 84;
        this.setPercentage(100);
    }
}
