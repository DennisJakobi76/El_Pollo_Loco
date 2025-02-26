const MUTE_ICON = document.getElementById("mute-icon");
const SPEAKER_ICON = document.getElementById("speaker-icon");
const START_SCREEN_WRAPPER = document.getElementById("start-screen-wrapper");
const END_SCREEN_WRAPPER = document.getElementById("end-screen-wrapper");
const CANVAS = document.getElementById("canvas");
const GAME_OVER_MESSAGE_IMG = document.getElementById("game-over-img");

let isStartScreen = true;

function unmuteMusic() {
    MUTE_ICON.classList.add("d-none");
    if (isStartScreen) {
        startScreenSound.currentTime = 0;
        startScreenSound.play();
    }
    setSoundVolumes();
}

function muteMusic() {
    MUTE_ICON.classList.remove("d-none");
    muteAllSounds();
}

function startGame() {
    isStartScreen = false;
    startScreenSound.pause();
    CANVAS.classList.remove("d-none");
    START_SCREEN_WRAPPER.classList.add("d-none");
    createWorld();
}

function restartGame() {
    GAME_OVER_MESSAGE_IMG.src = "assets/img/9_intro_outro_screens/game_over/game over.png";
    stopAllAudios();
    muteMusic();
    END_SCREEN_WRAPPER.classList.add("d-none");
    startGame();
}

function showHomeScreen() {
    GAME_OVER_MESSAGE_IMG.src = "assets/img/9_intro_outro_screens/game_over/game over.png";
    stopAllAudios();
    muteMusic();
    isStartScreen = true;
    CANVAS.classList.add("d-none");
    END_SCREEN_WRAPPER.classList.add("d-none");
    START_SCREEN_WRAPPER.classList.remove("d-none");
}
