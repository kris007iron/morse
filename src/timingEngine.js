import { DOT_LENGTH, DASH_LENGTH, ERROR_MARGIN_DOT, ERROR_MARGIN_DASH } from "./config.js";

export function classifyPress(duration)
{
    if (Math.abs(duration - DOT_LENGTH) <= DOT_LENGTH * ERROR_MARGIN_DOT)
    {
        return ".";
    }
    if (Math.abs(duration - DASH_LENGTH) <= DASH_LENGTH * ERROR_MARGIN_DASH)
    {
        return "-";
    }
    return null;
}

export function isDot(ms)
{
    if (Math.abs(ms - DOT_LENGTH) >= DOT_LENGTH * ERROR_MARGIN_DOT)
    {
        return false;
    }
    return true;
}

export function isDash(ms)
{
    if (Math.abs(ms - DASH_LENGTH) >= DASH_LENGTH * ERROR_MARGIN_DASH)
    {
        return false;
    }
    return true;
}
