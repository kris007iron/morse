import { startTone, stopTone } from "./audioEngine.js";
import { fillBarParam } from "./barRenderer.js";

let pressStart = 0;
let currentSign = 0;
let currentPause = 0;
let interval = null;

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
        interval = null;
        currentSign++;
        onRelease(duration);
    });

    button.addEventListener("mouseleave", () =>
    {
        if (interval)
        {
            const duration = Date.now() - pressStart;
            stopTone();
            clearInterval(interval);
            interval = null;
            currentSign++;
            onRelease(duration);
        }        
    });
}
