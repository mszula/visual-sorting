import type { SortingGenerator } from './types';

function* stoogeSortRun(arr: number[], l: number, h: number): SortingGenerator {
  if (l >= h) return;

  yield { access: [l, h], sound: l };

  // If first element is smaller
  // than last, swap them
  if (arr[l] > arr[h]) {
    const t = arr[l];
    arr[l] = arr[h];
    arr[h] = t;
  }

  // If there are more than 2
  // elements in the array
  if (h - l + 1 > 2) {
    const t = Math.floor((h - l + 1) / 3);

    // Recursively sort first
    // 2/3 elements
    yield* stoogeSortRun(arr, l, h - t);

    // Recursively sort last
    // 2/3 elements
    yield* stoogeSortRun(arr, l + t, h);

    // Recursively sort first
    // 2/3 elements again to
    // confirm
    yield* stoogeSortRun(arr, l, h - t);
  }
}

export const stoogeSort = function* (arr: number[]): SortingGenerator {
  yield* stoogeSortRun(arr, 0, arr.length - 1);
};
