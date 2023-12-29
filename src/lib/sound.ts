import { Oscillator, Volume } from "tone";
import type { Time } from "tone/build/esm/core/type/Units";

let oscilator: Oscillator;
let freqStepSize = 0;

const maxFrequency = 1500;
const minFrequency = 100;

export const soundStart = (size: number) => {
  freqStepSize = maxFrequency / size;

  oscilator = new Oscillator().connect(new Volume(-20).toDestination());
  oscilator.type = "sawtooth";
  oscilator.start();
};

export const soundStop = (time?: Time) => {
  if (oscilator) {
    oscilator.stop(time);
  }
};

export const playValue = (value: number) => {
  if (oscilator) {
    const freq = freqStepSize * (value - 1) + minFrequency;

    oscilator.frequency.value = freq;
  }
};
