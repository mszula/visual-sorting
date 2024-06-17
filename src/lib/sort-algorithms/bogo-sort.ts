import type { SortingGenerator } from './types';

function* isSorted(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    yield { access: [i], sound: i };
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

// To generate permutation of the array
function* shuffle(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    const ind = Math.floor(Math.random() * arr.length);
    yield { access: [arr.length - i - 1, ind], sound: ind };

    const temp = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = arr[ind];
    arr[ind] = temp;
  }
}

// Sorts array a[0..n-1] using Bogo sort
export const bogoSort = function* (a: number[]): SortingGenerator {
  // if array is not sorted then shuffle
  // the array again
  let sorted = yield* isSorted(a);
  while (!sorted) {
    yield* shuffle(a);

    sorted = yield* isSorted(a);
  }
};
