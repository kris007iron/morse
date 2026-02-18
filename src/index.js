import { loadMorseData } from "./morseData.js";
import { renderBars, fillBar } from "./barRenderer.js";
import { bindInput } from "./inputHandler.js";
import { handleUserPress } from "./gameLogic.js";

const TIME_ELEMENT = document.getElementById("time");
const SIGN_ELEMENT = document.getElementById("sign");
const SIGN_TO_CLICK = document.getElementById("signToClick");
const BAR_CONTAINER = document.getElementById("signBars");
const MORSE_BTN = document.getElementById("morse");

let morsecode = {};

morsecode = await loadMorseData();

document.getElementById("start").addEventListener("click", () =>
{
    const words = ["hello", "world"];
    renderBars(words, morsecode, BAR_CONTAINER);

    const keys = Object.keys(morsecode);
    SIGN_TO_CLICK.textContent = keys[Math.floor(Math.random() * keys.length)];
});

bindInput(MORSE_BTN, (duration) =>
{
    handleUserPress(duration, TIME_ELEMENT, SIGN_ELEMENT);
});
