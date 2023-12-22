import type { SortElement } from "./types";

export const generateArray = (size: number): Array<SortElement> =>
  Array.from({ length: size }, (_value, index) => index + 1).map((v, i) => ({
    value: v,
    processing: false,
    onPlaceIndex: i,
    makeSound: false,
  }));

export const shuffle = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array;
};
