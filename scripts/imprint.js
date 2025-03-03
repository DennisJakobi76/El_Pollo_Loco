/**
 * Navigates the browser back to the previous page in the session history.
 */

function getBackToPreviousSite() {
    window.history.back();
}

/**
 * Toggles the browser to and from full screen. If the browser is currently in
 * full screen mode, it will exit full screen mode and return to normal mode.
 * If the browser is not currently in full screen mode, it will attempt to
 * request full screen mode.
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
