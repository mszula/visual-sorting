// Javascript Program to implement
// Odd-Even / Brick Sort

import type { SortingGenerator } from './types';

export const oddEvenSort = function* (arr: number[]): SortingGenerator {
  // Initially array is unsorted
  const n = arr.length;

  let isSorted = false;

  while (!isSorted) {
    isSorted = true;
    let temp = 0;

    // Perform Bubble sort on odd indexed element
    for (let i = 1; i <= n - 2; i = i + 2) {
      yield { access: [i, i + 1], sound: i };
      if (arr[i] > arr[i + 1]) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        isSorted = false;
      }
    }

    // Perform Bubble sort on even indexed element
    for (let i = 0; i <= n - 2; i = i + 2) {
      yield { access: [i, i + 1], sound: i };
      if (arr[i] > arr[i + 1]) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        isSorted = false;
      }
    }
  }
};
