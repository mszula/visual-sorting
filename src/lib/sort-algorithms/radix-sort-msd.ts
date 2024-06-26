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

const countSortMSD = function* (
  arr: number[],
  exp: number,
  start: number,
  end: number
): SortingGenerator {
  const n = end - start + 1;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  // Store count of occurrences in count[]
  for (let i = start; i <= end; i++) {
    const x = Math.floor(arr[i] / exp) % 10;
    count[x]++;
    yield { access: [i], sound: i };
  }

  // Change count[i] so that count[i] now contains
  // actual position of this digit in output[]
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];

  // Build the output array
  for (let i = end; i >= start; i--) {
    const x = Math.floor(arr[i] / exp) % 10;
    output[--count[x]] = arr[i];
    yield { access: [i], sound: i };
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    arr[start + i] = output[i];
    yield { access: [start + i], sound: start + i };
  }
};

const radixSortMSDUtil = function* (
  arr: number[],
  exp: number,
  start: number,
  end: number
): SortingGenerator {
  if (start >= end) return;

  // Perform counting sort
  yield* countSortMSD(arr, exp, start, end);

  // Recur for each bucket
  const buckets = new Array(10).fill(0);
  for (let i = start; i <= end; i++) {
    const x = Math.floor(arr[i] / exp) % 10;
    buckets[x]++;
  }

  let s = start;
  for (let i = 0; i < 10; i++) {
    if (buckets[i] > 1) {
      yield* radixSortMSDUtil(arr, exp / 10, s, s + buckets[i] - 1);
    }
    s += buckets[i];
  }
};

// The main function to that sorts arr[] of size n using
// MSD Radix Sort
export const radixSortMSD = function* (arr: number[]): SortingGenerator {
  const len = arr.length;
  // Find the maximum number to know number of digits
  const m = yield* getMax(arr, len);

  // Get the largest exponent
  let exp = 1;
  while (Math.floor(m / exp) > 0) {
    exp *= 10;
  }
  exp /= 10;

  // Call the utility function for MSD radix sort
  yield* radixSortMSDUtil(arr, exp, 0, len - 1);
};
