import { DOT_LENGTH, DASH_LENGTH, ERROR_MARGIN_DOT, ERROR_MARGIN_DASH } from "./config.js";

export const morseBars = [];

export function resetBars(container)
{
    while (morseBars.length > 0)
    {
        morseBars.pop();
    }
    container.innerHTML = "";
}

export function createBar(length)
{
    const bar = document.createElement('div');
    const background = document.createElement('div');
    const value = document.createElement('div');

    bar.classList.add('bar');
    if (length == 20)
    {
        bar.classList.add('dot');
    }
    bar.style.width = `${length}px`;
    background.classList.add('background');
    value.classList.add('value');

    value.style.width = "0%";

    background.appendChild(value);
    bar.appendChild(background);
    return bar;
}

export function renderBars(words, morsecode, container)
{
    resetBars(container);

    for (const word of words)
    {
        const wordBox = document.createElement("div");
        wordBox.classList.add("word-box");

        for (const letter of word)
        {
            const letterBox = document.createElement("div");
            letterBox.classList.add("letter-box");
            const letterM = morsecode[letter];

            for (const sign of letterM)
            {
                const bar = createBar(sign === "-" ? 60 : 20);
                morseBars.push(bar);
                letterBox.append(bar);
            }
            wordBox.append(letterBox);
        }
        container.append(wordBox);
    }
}

export function fillBar(index)
{
    if (!morseBars[index]) return;
    morseBars[index].children[0].children[0].style.width = "100%";
}

export function fillBarParam(index, ms)
{
    if (!morseBars[index]) return;
    if (morseBars[index].classList.contains("dot"))
    {
        morseBars[index].children[0].children[0].style.width = `${ms}%`;
        if (Math.abs(ms - DOT_LENGTH) >= DOT_LENGTH * ERROR_MARGIN_DOT)
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "#A00";
        } else
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "cornflowerblue";
        }
    } else
    {
        morseBars[index].children[0].children[0].style.width = `${ms / 3}%`;
        if (Math.abs(ms - DASH_LENGTH) >= DASH_LENGTH * ERROR_MARGIN_DASH)
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "#A00";
        }
        else
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "cornflowerblue";
        }
    }
}