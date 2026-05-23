import type { SortingGenerator } from './types';

export const bubbleSort = function* (arr: number[]): SortingGenerator {
  for (let i = 0; i < arr.length; i++) {
    let sorted = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      let swaps = 0;
      let accesses = 2; // read arr[j], arr[j + 1]
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps = 1;
        accesses += 4; // two reads + two writes for the swap
        sorted = false;
      }
      yield {
        access: [j, j + 1],
        sound: j + 1,
        comparisons: 1,
        swaps,
        accesses,
      };
    }
    if (sorted) return;
  }
};
