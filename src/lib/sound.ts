import { Synth } from 'tone';
import type { Time } from 'tone/build/esm/core/type/Units';

const synth = new Synth().toDestination();
let freqStepSize = 0;

const maxFrequency = 1500;
const minFrequency = 100;

export const soundStart = (size: number) => {
  freqStepSize = maxFrequency / size;
  synth.triggerAttack(0);
};

export const soundStop = (time?: Time) => {
  synth.triggerRelease(time);
};

export const playValue = (value: number) => {
  const freq = freqStepSize * (value - 1) + minFrequency;

  synth.oscillator.frequency.value = freq;
};
