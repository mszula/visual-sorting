import type { SortingGenerator } from "./types";

export const insertionSort = function* (arr: number[]): SortingGenerator {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
      arr[j + 1] = arr[j];

      yield { access: [i, j], sound: j };
    }
    arr[j + 1] = currentValue;

    yield { access: [i, j + 1], sound: i };
  }
};
