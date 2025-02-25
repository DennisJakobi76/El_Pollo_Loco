const MUTE_ICON = document.getElementById("mute-icon");
const SPEAKER_ICON = document.getElementById("speaker-icon");
const START_SCREEN_WRAPPER = document.getElementById("start-screen-wrapper");
const END_SCREEN_WRAPPER = document.getElementById("end-screen-wrapper");
const CANVAS = document.getElementById("canvas");

function unmuteMusic() {
    MUTE_ICON.classList.add("d-none");
    startScreenSound.play();
    startScreenSound.addEventListener("ended", () => {
        startScreenSound.currentTime = 0;
        startScreenSound.play();
    });
}

function muteMusic() {
    MUTE_ICON.classList.remove("d-none");
    startScreenSound.pause();
}

function startGame() {
    startScreenSound.pause();
    CANVAS.classList.remove("d-none");
    START_SCREEN_WRAPPER.classList.add("d-none");
    createWorld();
}

function showHomeScreen() {
    // stopAllAudios();
    // muteMusic();
    // CANVAS.classList.add("d-none");
    // END_SCREEN_WRAPPER.classList.add("d-none");
    // START_SCREEN_WRAPPER.classList.remove("d-none");
    location.reload();
}
