import type { SortingGenerator } from "./types";

export const bubleSort = function* (arr: number[]): SortingGenerator {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        yield { accesing: [j, j + 1], processing: [j, j + 1] };
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      } else {
        yield { accesing: [j, j + 1], processing: [] };
      }
    }
  }
};
