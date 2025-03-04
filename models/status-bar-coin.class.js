class StatusBarCoin extends StatusBar {
    y = 42;

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
     * Loads the images for the coin status bar and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}
