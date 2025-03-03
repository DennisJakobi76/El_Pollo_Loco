class StatusBarCoin extends StatusBar {
    IMAGES = [
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ];

    /**
     * Creates a new StatusBarCoin instance.
     *
     * Sets the initial percentage of the status bar to 0.
     * The status bar is positioned at y = 42 on the screen.
     * The images for the status bar are loaded at construction time.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 42;
        this.setPercentage(0);
    }
}
