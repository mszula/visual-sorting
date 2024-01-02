import type { SortingGenerator } from "./types";

export const bubleSort = function* (arr: number[]): SortingGenerator {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { accesing: [j, j + 1], sound: j + 1 };

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
};
