const MUTE_ICON = document.getElementById("mute-icon");
const SPEAKER_ICON = document.getElementById("speaker-icon");
const SCREEN_ICON = document.getElementById("toggle-screen-icon");
const START_SCREEN_WRAPPER = document.getElementById("start-screen-wrapper");
const END_SCREEN_WRAPPER = document.getElementById("end-screen-wrapper");
const CANVAS = document.getElementById("canvas");
const GAME_OVER_MESSAGE_IMG = document.getElementById("game-over-img");

let isStartScreen = true;

function unmuteMusic() {
    MUTE_ICON.classList.add("d-none");
    if (isStartScreen || (eplSoundChoice && !isFirstGameStart && isStartScreen)) {
        startScreenSound.currentTime = 0;
        startScreenSound.play();
    }

    setSoundVolumes();
    eplSoundChoice = true;
    writeSoundChoiceToLocalStorage();
}

function muteMusic() {
    MUTE_ICON.classList.remove("d-none");
    muteAllSounds();
    eplSoundChoice = false;
    writeSoundChoiceToLocalStorage();
}

function startGame() {
    isStartScreen = false;
    startScreenSound.pause();
    CANVAS.classList.remove("d-none");
    START_SCREEN_WRAPPER.classList.add("d-none");
    eplSoundChoice = readSoundChoiceFromLocalStorage();
    if (eplSoundChoice === "false") {
        muteAllSounds();
    } else {
        unmuteMusic();
    }
    createWorld();
    isFirstGameStart = false;
}

function restartGame() {
    GAME_OVER_MESSAGE_IMG.src = "./assets/img/9_intro_outro_screens/game_over/game over.png";
    stopAllAudios();
    eplSoundChoice = readSoundChoiceFromLocalStorage();
    if (eplSoundChoice === "false") {
        muteAllSounds();
    } else {
        unmuteMusic();
    }
    END_SCREEN_WRAPPER.classList.add("d-none");
    startGame();
}

function showHomeScreen() {
    GAME_OVER_MESSAGE_IMG.src = "./assets/img/9_intro_outro_screens/game_over/game over.png";
    isStartScreen = true;
    stopAllAudios();

    if (!isFirstGameStart && eplSoundChoice === "false") {
        muteMusic();
    } else {
        unmuteMusic();
    }

    CANVAS.classList.add("d-none");
    END_SCREEN_WRAPPER.classList.add("d-none");
    START_SCREEN_WRAPPER.classList.remove("d-none");
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        SCREEN_ICON.src = "./assets/icons/window_mode_icon.png";
        document.documentElement.requestFullscreen();
    } else {
        SCREEN_ICON.src = "./assets/icons/fullscreen_icon.png";
        document.exitFullscreen();
    }
}
