import { startTone, stopTone } from "./audioEngine.js";
import { fillBarParam, fillPauseParam } from "./barRenderer.js";

let pressStart = 0;
let pauseStart = 0;
let currentSign = 0;
let currentPause = -1;
let interval = null;
let pauseInterval = null;

export function setCurrentSign(value)
{
    currentSign = value;
}

export function setCurrentPause(value)
{
    currentPause = value;
}

export function bindInput(button, onRelease,
    morseBars)
{
    button.addEventListener("mousedown", () =>
    {
        pressStart = Date.now();
        startTone();
        clearInterval(pauseInterval);
        pauseInterval = null;
        currentPause++;
        interval = setInterval(() =>
        {
            fillBarParam(currentSign, Date.now() - pressStart)
        }, 10);
    });

    button.addEventListener("mouseup", () =>
    {
        if (interval)
        {
            pauseStart = Date.now();
            const duration = pauseStart - pressStart;
            stopTone();
            clearInterval(interval);
            interval = null;
            currentSign++;
            onRelease(duration);
            pauseInterval = setInterval(() =>
            {
                fillPauseParam(currentPause, Date.now() - pauseStart)
            }, 10);
        }
    });

    button.addEventListener("mouseleave", () =>
    {
        if (interval)
        {
            pauseStart = Date.now();
            const duration = pauseStart - pressStart;
            stopTone();
            clearInterval(interval);
            interval = null;
            currentSign++;
            onRelease(duration);
            pauseInterval = setInterval(() =>
            {
                fillPauseParam(currentPause, Date.now() - pauseStart)
            }, 10);
        }
    });
}
