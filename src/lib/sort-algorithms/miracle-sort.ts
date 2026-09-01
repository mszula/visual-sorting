import type { SortingGenerator } from './types';

function* isSorted(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    yield { access: [i], sound: i };
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

// Sorts array a[0..n-1] using Miracle sort
export const miracleSort = function* (a: number[]): SortingGenerator {
  // if array is not sorted then wait for a miracle to happen
  let sorted = yield* isSorted(a);
  while (!sorted) {
    sorted = yield* isSorted(a);
  }
};
