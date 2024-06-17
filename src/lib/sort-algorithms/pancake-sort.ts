// JavaScript program to sort array using pancake sort

import type { SortingGenerator } from './types';

// Reverses arr[0..i]
function* flip(arr: number[], i: number) {
  let temp,
    start = 0;
  while (start < i) {
    yield { access: [start, i], sound: i };

    temp = arr[start];
    arr[start] = arr[i];
    arr[i] = temp;
    start++;
    i--;
  }
}

// Returns index of the
// maximum element in
// arr[0..n-1]
function* findMax(arr: number[], n: number) {
  let mi, i;
  for (mi = 0, i = 0; i < n; ++i) {
    yield { access: [i, mi], sound: i };

    if (arr[i] > arr[mi]) {
      mi = i;
    }
  }

  return mi;
}

// The main function that
// sorts given array using
// flip operations
export const pancakeSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  // Start from the complete
  // array and one by one
  // reduce current size by one
  for (let curr_size = n; curr_size > 1; --curr_size) {
    // Find index of the
    // maximum element in
    // arr[0..curr_size-1]
    const mi = yield* findMax(arr, curr_size);

    // Move the maximum element
    // to end of current array
    // if it's not already at
    // the end
    if (mi != curr_size - 1) {
      // To move at the end,
      // first move maximum
      // number to beginning
      yield* flip(arr, mi);

      // Now move the maximum
      // number to end by
      // reversing current array
      yield* flip(arr, curr_size - 1);
    }
  }
};
