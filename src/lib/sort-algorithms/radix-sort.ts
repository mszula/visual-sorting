import type { SortingGenerator } from './types';

const getMax = function* (arr: number[], n: number) {
  let mx = arr[0];
  for (let i = 1; i < n; i++) {
    yield { access: [i], sound: i };
    if (arr[i] > mx) {
      mx = arr[i];
    }
  }
  return mx;
};

const countSort = function* (
  arr: number[],
  n: number,
  exp: number
): SortingGenerator {
  const output = new Array(n); // output array
  const count = new Array(10);

  let i;
  for (let i = 0; i < 10; i++) count[i] = 0;

  // Store count of occurrences in count[]
  for (i = 0; i < n; i++) {
    const x = Math.floor(arr[i] / exp) % 10;
    count[x]++;
    yield { access: [i], sound: i };
  }

  // Change count[i] so that count[i] now contains
  // actual position of this digit in output[]
  for (i = 1; i < 10; i++) count[i] += count[i - 1];

  // Build the output array
  for (i = n - 1; i >= 0; i--) {
    const x = Math.floor(arr[i] / exp) % 10;
    output[count[x] - 1] = arr[i];
    count[x]--;
    yield { access: [i], sound: i };
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (i = 0; i < n; i++) {
    arr[i] = output[i];
    yield { access: [i], sound: i };
  }
};

// The main function to that sorts arr[] of size n using
// Radix Sort
export const radixSort = function* (arr: number[]): SortingGenerator {
  const len = arr.length;
  // Find the maximum number to know number of digits
  const m = yield* getMax(arr, len);

  // Do counting sort for every digit. Note that
  // instead of passing digit number, exp is passed.
  // exp is 10^i where i is current digit number
  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
    yield { access: [] };
    yield* countSort(arr, len, exp);
    yield { access: [] };
  }
};
