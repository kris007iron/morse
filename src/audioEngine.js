let context = new (window.AudioContext || window.webkitAudioContext)();
let currentOsc = null;
let currentGain = null;

export function startTone()
{
    stopTone();

    currentOsc = context.createOscillator();
    currentGain = context.createGain();

    currentOsc.type = "sine";
    currentOsc.connect(currentGain);
    currentGain.connect(context.destination);

    currentGain.gain.setValueAtTime(1, context.currentTime);
    currentOsc.start();
}

export function stopTone()
{
    if (!currentOsc || !currentGain) return;

    currentGain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.02);
    currentOsc.stop(context.currentTime + 0.05);

    currentOsc.disconnect();
    currentGain.disconnect();
    currentOsc = null;
    currentGain = null;
}