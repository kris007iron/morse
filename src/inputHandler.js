import { startTone, stopTone } from "./audioEngine.js";

let pressStart = 0;

export function bindInput(button, onRelease)
{
    button.addEventListener("mousedown", () =>
    {
        pressStart = Date.now();
        startTone();
    });

    button.addEventListener("mouseup", () =>
    {
        const duration = Date.now() - pressStart;
        stopTone();
        onRelease(duration);
    });

    button.addEventListener("mouseleave", () =>
    {
        stopTone();
    });
}
