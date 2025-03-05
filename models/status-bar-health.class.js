class StatusBarHealth extends StatusBar {
    y = 84;

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
     *
     * Sets the initial percentage of the status bar to 100.
     * The status bar is positioned at y = 84 on the screen.
     * The images for the status bar are loaded at construction time.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}
