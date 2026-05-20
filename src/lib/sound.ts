import {
  customOscillators,
  customOscillatorTypes,
} from 'web-audio-oscillators';
import { browser } from '$app/environment';

export type OscillatorType = (typeof customOscillatorTypes)[number] | null;

const context = browser && new AudioContext();

let oscillator: OscillatorNode | null = null;
let freqStepSize = 0;

const maxFrequency = 1500;
const minFrequency = 10;

export const soundStart = (
  size: number,
  oscillatorName: NonNullable<OscillatorType>
) => {
  if (!context) {
    return;
  }

  freqStepSize = maxFrequency / size;
  soundStop();
  oscillator = customOscillators[oscillatorName](context);
  oscillator.connect(context.destination);
  oscillator.start();
};

export const soundStop = () => {
  if (!oscillator) {
    return;
  }
  try {
    oscillator.stop();
  } catch {
    // already stopped — Web Audio throws InvalidStateError on double stop
  }
  oscillator.disconnect();
  oscillator = null;
};

export const playValue = (value: number) => {
  if (!oscillator) {
    return;
  }
  oscillator.frequency.value = freqStepSize * (value - 1) + minFrequency;
};
