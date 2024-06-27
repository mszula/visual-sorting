import type { SortingGenerator } from './types';

function* sort(arr: number[], l: number, h: number): SortingGenerator {
  if (l >= h) {
    return;
  }

  // If first element is smaller than last, swap them
  if (arr[l] > arr[h]) {
    [arr[l], arr[h]] = [arr[h], arr[l]];
    yield { access: [l, h], sound: l };
  }

  // If there are more than two elements in the array
  if (h - l + 1 > 2) {
    const t = Math.floor((h - l + 1) / 3);

    // Recursively sort first 2/3 elements
    yield* sort(arr, l, h - t);

    // Recursively sort last 2/3 elements
    yield* sort(arr, l + t, h);

    // Recursively sort first 2/3 elements again to confirm
    yield* sort(arr, l, h - t);
  }
}

export const stoogeSort = function* (arr: number[]): SortingGenerator {
  yield* sort(arr, 0, arr.length - 1);
};
