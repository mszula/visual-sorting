import { Oscillator } from "tone";

let oscilator: Oscillator = new Oscillator().toDestination();

export const soundStart = () => {
  oscilator.type = "square"; // rodzaj oscylatora
  oscilator.start();
};

export const getOscilator = () => oscilator;
