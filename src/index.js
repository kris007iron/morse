import { loadMorseData } from "./morseData.js";
import { renderBars, fillBar, morseBars } from "./barRenderer.js";
import { setCurrentSign } from './inputHandler.js';
import { bindInput } from "./inputHandler.js";
import { handleUserPress } from "./gameLogic.js";

const TIME_ELEMENT = document.getElementById("time");
const SIGN_ELEMENT = document.getElementById("sign");
const SIGN_TO_CLICK = document.getElementById("signToClick");
const BAR_CONTAINER = document.getElementById("workspace");
const TEXT_CONTAINER = document.getElementById("text");
const MORSE_BTN = document.getElementById("workspace");

let morsecode = {};

morsecode = await loadMorseData();

document.getElementById("start").addEventListener("click", () =>
{
    setCurrentSign(0);
    const words = ["hello", "world"];
    TEXT_CONTAINER.textContent = words.map((e) => { return e.toUpperCase() }).join(" ")
    renderBars(words, morsecode, BAR_CONTAINER);

    const keys = Object.keys(morsecode);
    SIGN_TO_CLICK.textContent = keys[Math.floor(Math.random() * keys.length)];
});

bindInput(MORSE_BTN, (duration) =>
{
    handleUserPress(duration, TIME_ELEMENT, SIGN_ELEMENT);
}, morseBars);
