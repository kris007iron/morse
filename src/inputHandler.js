import { startTone, stopTone } from "./audioEngine.js";
import { fillBarParam } from "./barRenderer.js";

let pressStart = 0;
let currentSign = 0;
let interval;

export function setCurrentSign(value)
{
    currentSign = value;
}

export function bindInput(button, onRelease,
    morseBars)
{
    button.addEventListener("mousedown", () =>
    {
        pressStart = Date.now();
        startTone();
        interval = setInterval(() =>
        {
            fillBarParam(currentSign, Date.now() - pressStart)
        }, 10);
    });

    button.addEventListener("mouseup", () =>
    {
        const duration = Date.now() - pressStart;
        stopTone();
        clearInterval(interval);
        currentSign++;
        onRelease(duration);
    });

    button.addEventListener("mouseleave", () =>
    {
        const duration = Date.now() - pressStart;
        stopTone();
        clearInterval(interval);
        currentSign++;
        onRelease(duration);
        //TODO: check whether it was pressed first so it doesn't falesly skip to the next one just because you left the box without clicking
    });
}
