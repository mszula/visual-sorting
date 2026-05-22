import type { SortingGenerator } from './types';

export const exchangeSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      let swaps = 0;
      let accesses = 2;
      if (arr[i] > arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        swaps = 1;
        accesses += 4;
      }
      yield {
        access: [i, j],
        sound: j,
        comparisons: 1,
        swaps,
        accesses,
      };
    }
  }
};
