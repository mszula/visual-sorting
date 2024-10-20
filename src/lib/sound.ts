import {
  customOscillators,
  customOscillatorTypes,
} from 'web-audio-oscillators';
import { browser } from '$app/environment';

export type OscillatorType = (typeof customOscillatorTypes)[number] | null;

const context = browser && new AudioContext();

let oscillator: OscillatorNode;
let freqStepSize = 0;

const maxFrequency = 1500;
const minFrequency = 10;

export const soundStart = (
  size: number,
  oscillatorName: NonNullable<OscillatorType>
) => {
  freqStepSize = maxFrequency / size;
  if (oscillator) {
    soundStop();
  }
  oscillator = customOscillators[oscillatorName](context);
  oscillator.connect(context.destination);
  oscillator.start();
};

export const soundStop = () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
  }
};

export const playValue = (value: number) => {
  const freq = freqStepSize * (value - 1) + minFrequency;

  if (oscillator) {
    oscillator.frequency.value = freq;
  }
};
