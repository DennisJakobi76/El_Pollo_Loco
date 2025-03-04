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

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Initializes a new instance of the StatusBarHealth class.
     *
     * Loads images for the health status bar and sets the initial percentage to 100.
     * The status bar is positioned at y = 84 on the screen.
     */

    /******  6fa80497-04f3-40eb-915c-0c7d93c38eee  *******/
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}
