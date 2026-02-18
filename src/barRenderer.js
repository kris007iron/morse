let morseBars = [];

export function resetBars(container)
{
    morseBars = [];
    container.innerHTML = "";
}

export function createBar(length)
{
    const bar = document.createElement('div');
    const background = document.createElement('div');
    const value = document.createElement('div');

    bar.classList.add('bar');
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
