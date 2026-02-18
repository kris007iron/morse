import { classifyPress } from "./timingEngine.js";

export function handleUserPress(duration, timeEl, signEl)
{
    timeEl.textContent = duration;

    const symbol = classifyPress(duration);
    if (symbol)
    {
        signEl.textContent = symbol;
    }
}
