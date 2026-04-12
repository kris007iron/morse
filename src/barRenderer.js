import { DOT_LENGTH, DASH_LENGTH, ERROR_MARGIN_DOT, ERROR_MARGIN_DASH, PIXEL_DOT_LENGTH, PIXEL_DASH_LENGTH, PIXEL_WORD_SPACE } from "./config.js";
import { isDot, isDash, isWordSpace } from "./timingEngine.js";

export const morseBars = [];
export const pauseBars = [];

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
    if (length == PIXEL_DOT_LENGTH)
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

export function createPause(length)
{
    const pause = document.createElement('div');
    const background = document.createElement('div');
    const value = document.createElement('div');

    switch (length)
    {
        case PIXEL_DOT_LENGTH:
            pause.classList.add("intra-space");
            break;
        case PIXEL_DASH_LENGTH:
            pause.classList.add("inter-space");
            break;
        case PIXEL_WORD_SPACE:
            pause.classList.add("word-space");
            break;
    }
    pause.classList.add('pause');
    pause.style.width = `${length}px`;
    background.classList.add('pause-background');
    value.classList.add('pause-value');

    value.style.width = "0%";

    background.appendChild(value);
    pause.appendChild(background);
    return pause;
}

export function renderBars(words, morsecode, container)
{
    resetBars(container);

    for (let i = 0; i < words.length; i++)
    {
        const word = words[i];
        const wordBox = document.createElement("div");
        wordBox.classList.add("word-box");

        for (let j = 0; j < word.length; j++)
        {
            const letter = word[j]
            const letterBox = document.createElement("div");
            letterBox.classList.add("letter-box");
            const letterM = morsecode[letter];

            for (let k = 0; k < letterM.length; k++)
            {
                const sign = letterM[k]
                const bar = createBar(sign === "-" ? PIXEL_DASH_LENGTH : PIXEL_DOT_LENGTH);
                morseBars.push(bar);
                letterBox.append(bar);
                if (k < letterM.length - 1)
                {
                    const pause = createPause(PIXEL_DOT_LENGTH);
                    letterBox.append(pause);
                    pauseBars.push(pause);
                } else if (k == letterM.length - 1 && j < word.length - 1)
                {
                    const interCharPause = createPause(PIXEL_DASH_LENGTH);
                    pauseBars.push(interCharPause);
                    console.log(interCharPause)
                    letterBox.append(interCharPause);
                } else if (j == word.length - 1)
                {
                    const wordPause = createPause(PIXEL_WORD_SPACE);
                    pauseBars.push(wordPause);
                    console.log(wordPause)
                    letterBox.append(wordPause);
                }

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
        if (!isDot(ms))
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "#A00";
        } else
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "cornflowerblue";
        }
    } else
    {
        morseBars[index].children[0].children[0].style.width = `${ms / 3}%`;
        if (!isDash(ms))
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "#A00";
        }
        else
        {
            morseBars[index].children[0].children[0].style.backgroundColor = "cornflowerblue";
        }
    }
}

export function fillPauseParam(index, ms)
{
    if (!pauseBars[index]) return;
    if (pauseBars[index].classList.contains("intra-space"))
    {
        pauseBars[index].children[0].children[0].style.width = `${ms}%`;
        if (!isDot(ms))
        {
            pauseBars[index].children[0].children[0].style.backgroundColor = "#A00";
        } else
        {
            pauseBars[index].children[0].children[0].style.backgroundColor = "cornflowerblue";
        }
    } else if (pauseBars[index].classList.contains("inter-space"))
    {
        pauseBars[index].children[0].children[0].style.width = `${ms / 3}%`;
        if (!isDash(ms))
        {
            pauseBars[index].children[0].children[0].style.backgroundColor = "#A00";
        }
        else
        {
            pauseBars[index].children[0].children[0].style.backgroundColor = "cornflowerblue";
        }
    } else
    {
        pauseBars[index].children[0].children[0].style.width = `${ms / 3 / 7}%`;
        if (!isWordSpace(ms))
        {
            pauseBars[index].children[0].children[0].style.backgroundColor = "#A00";
        }
        else
        {
            pauseBars[index].children[0].children[0].style.backgroundColor = "cornflowerblue";
        }
    }
}