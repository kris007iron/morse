let morsecode = []
const DOT_LENGTH = 100
const DASH_LENGTH = DOT_LENGTH * 3
const INTRA_CHAR_SPACE = DOT_LENGTH
const INTER_CHAR_SPACE = DASH_LENGTH
const WORD_SPACE = DASH_LENGTH * 7
const ERROR_MARGIN_DOT = 0.50
const ERROR_MARGIN_DASH = 0.20
const TIME_ELEMENT = document.getElementById("time")
const SING_ELEMENT = document.getElementById("sign")
const SIGN_TO_CLICK = document.getElementById("signToClick")

let time_clicked = 0
let mean_dot
let mean_dash
let signs = ""
let context = new (window.AudioContext || window.webkitAudioContext)();
let currentOsc = null;
let currentGain = null;

let morse_bars = []

await fetch('./morse-code.json')
    .then(response => response.json())
    .then(data =>
    {
        morsecode = data.morsecode

    })
    .catch(error => console.log(error));

async function generate_sound(text)
{
    generate_sound_bars(text)
    let sign_index = 0
    for (const word in text)
    {
        console.log(text[word]);

        for (const letter in text[word])
        {
            const letterM = morsecode[text[word][letter].toString()]
            console.log(letterM);

            for (const sign in letterM)
            {
                if (letterM[sign] == "-")
                {
                    startSound()
                    progress_sound_bar(morse_bars[sign_index])
                    await sleep(DASH_LENGTH)
                    endSound()
                    await sleep(INTRA_CHAR_SPACE)
                }
                if (letterM[sign] == ".")
                {
                    startSound()
                    progress_sound_bar(morse_bars[sign_index])
                    await sleep(DOT_LENGTH)
                    endSound()
                    await sleep(INTRA_CHAR_SPACE)
                }
                sign_index += 1
            }
            await sleep(INTER_CHAR_SPACE)
        }
        await sleep(WORD_SPACE)
    }
}

function progress_sound_bar(sign, length)
{
    const startDate = new Date().getTime()
    const endDate = startDate + length
    //TODO: change the bar as the sound progresses yet this is only for generative purposes, when 
    // user will be clicking this will be performed with different function and other visuals to be distinctive to the generated one
    sign.getChildrenByClass("value")
    console.log(sign.getChildrenByClass("value"))

}

function generate_sound_bars(text)
{
    //TODO: finish grouping and correct displaying of bars inline
    for (const word in text)
    {
        const wordBox = document.createElement('div')
        wordBox.classList.add('word-box')
        for (const letter in text[word])
        {
            const letterBox = document.createElement('div')
            letterBox.classList.add('letter-box')
            const letterM = morsecode[text[word][letter].toString()]
            for (const sign in letterM)
            {
                if (letterM[sign] == "-")
                {
                    const dash = createBar(60)
                    dash.classList.add
                    morse_bars.push(dash)
                    letterBox.append(dash)
                }
                if (letterM[sign] == ".")
                {
                    const dot = createBar(20)
                    morse_bars.push(dot)
                    letterBox.append(dot)
                }
            }
            wordBox.append(letterBox)
        }
        document.body.append(wordBox)
    }
}
document.getElementById("start").addEventListener("click", async () =>
{
    await generate_sound(["hello", "world"])
    // await generate_sound(["Hello", "world", "from"])
    // generate_sound_bars(["hello", "world"])
    const letter_keys = Object.keys(morsecode)
    console.log(letter_keys);
    let random_index = Math.floor(Math.random() * letter_keys.length)
    let random_letter = letter_keys[random_index]
    console.log(random_index)
    console.log(random_letter)
    console.log(letter_keys.length);

    SIGN_TO_CLICK.textContent = random_letter
})

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startSound()
{
    if (currentGain || currentOsc)
    {
        currentGain.gain.exponentialRampToValueAtTime(
            0.00000001, context.currentTime + 0.02
        );

        // Stop oscillator after the fade
        currentOsc.stop(context.currentTime + 0.36);

        // Clean up references
        currentOsc.disconnect();
        currentGain.disconnect();
        currentOsc = null;
        currentGain = null;
    }
    currentOsc = context.createOscillator();
    currentGain = context.createGain();

    currentOsc.type = "sine";
    currentOsc.connect(currentGain);
    currentGain.connect(context.destination);

    // Start oscillator at full volume
    time_clicked = new Date().getTime()
    currentOsc.start(0);
    SING_ELEMENT.textContent = ""
}

function endSound()
{
    if (!currentOsc || !currentGain) return;

    // Smoothly fade out
    currentGain.gain.exponentialRampToValueAtTime(
        0.00000001, context.currentTime + 0.02
    );

    // Stop oscillator after the fade
    currentOsc.stop(context.currentTime + 0.36);

    // Clean up references
    currentOsc.disconnect();
    currentGain.disconnect();
    currentOsc = null;
    currentGain = null;
    time_clicked -= new Date().getTime()
    time_clicked = Math.abs(time_clicked)
    TIME_ELEMENT.textContent = time_clicked
    if (Math.abs(time_clicked - DOT_LENGTH) <= DOT_LENGTH * ERROR_MARGIN_DOT)
    {
        SING_ELEMENT.textContent = "."
    } else if (Math.abs(time_clicked - DASH_LENGTH) <= DASH_LENGTH * ERROR_MARGIN_DASH)
    {
        SING_ELEMENT.textContent = "-"
    }
}

document.getElementById("morse").addEventListener("mousedown", function ()
{

    startSound();
});

document.getElementById("morse").addEventListener("mouseup", function ()
{

    endSound();
});

document.getElementById("morse").addEventListener("mouseleave", function ()
{
    endSound();
});

function createBar(length)
{
    const bar = document.createElement('div');
    const background = document.createElement('div');
    const value = document.createElement('div');

    bar.classList.add('bar');
    bar.style.width = `${length}px`;
    background.classList.add('background');
    value.classList.add('value');
    if (length == 60)
    {
        value.classList.add('dash')
    } else if (length == 20)
    {
        value.classList.add('dot')
    }
    value.style.width = `10%`

    background.appendChild(value);
    bar.appendChild(background);
    return bar;
}