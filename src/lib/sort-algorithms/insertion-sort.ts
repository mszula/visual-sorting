import type { SortingGenerator } from './types';

export const insertionSort = function* (arr: number[]): SortingGenerator {
  for (let i = 1; i < arr.length; i++) {
    const currentValue = arr[i]; // 1 read
    let j = i - 1;
    while (j >= 0) {
      // comparison arr[j] > currentValue: 1 cmp, 1 read
      if (arr[j] <= currentValue) {
        yield {
          access: [i, j],
          sound: j,
          comparisons: 1,
          accesses: 1,
        };
        break;
      }
      arr[j + 1] = arr[j]; // shift: 1 read + 1 write
      yield {
        access: [i, j],
        sound: j,
        comparisons: 1,
        // counted as a write-only "shift" — not a full swap
        accesses: 3, // compare read + shift read + shift write
      };
      j--;
    }
    arr[j + 1] = currentValue; // final placement write
    yield {
      access: [i, j + 1],
      sound: i,
      accesses: 1,
    };
  }
};
