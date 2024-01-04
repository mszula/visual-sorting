import type { SortingGenerator } from "./types";

const MIN_MERGE = 32;

const minRunLength = (n: number) => {
  // Becomes 1 if any 1 bits are shifted off
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
};

// This function sorts array from left index to
// to right index which is of size atmost RUN
const insertionSort = function* (
  arr: number[],
  left: number,
  right: number
): SortingGenerator {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;

    while (j >= left && arr[j] > temp) {
      yield { accesing: [i, j], sound: j };
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
};

// Merge function merges the sorted runs
const merge = function* (
  arr: number[],
  l: number,
  m: number,
  r: number
): SortingGenerator {
  // Original array is broken in two parts
  // left and right array
  const len1 = m - l + 1,
    len2 = r - m;
  const left = new Array(len1);
  const right = new Array(len2);
  for (let x = 0; x < len1; x++) {
    yield { accesing: [l + x], sound: l + x };
    left[x] = arr[l + x];
  }
  for (let x = 0; x < len2; x++) {
    yield { accesing: [m + 1 + x], sound: m + 1 + x };
    right[x] = arr[m + 1 + x];
  }

  let i = 0;
  let j = 0;
  let k = l;

  // After comparing, we merge those two
  // array in larger sub array
  while (i < len1 && j < len2) {
    yield { accesing: [k], sound: k };

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements
  // of left, if any
  while (i < len1) {
    yield { accesing: [k], sound: k };

    arr[k] = left[i];
    k++;
    i++;
  }

  // Copy remaining element
  // of right, if any
  while (j < len2) {
    yield { accesing: [k], sound: k };

    arr[k] = right[j];
    k++;
    j++;
  }
};

// Iterative Timsort function to sort the
// array[0...n-1] (similar to merge sort)
export const timSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;
  const minRun = minRunLength(MIN_MERGE);

  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += minRun) {
    yield { accesing: [i], sound: i };

    yield* insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
  }

  // Start merging from size
  // RUN (or 32). It will
  // merge to form size 64,
  // then 128, 256 and so on
  // ....
  for (let size = minRun; size < n; size = 2 * size) {
    // Pick starting point
    // of left sub array. We
    // are going to merge
    // arr[left..left+size-1]
    // and arr[left+size, left+2*size-1]
    // After every merge, we
    // increase left by 2*size
    for (let left = 0; left < n; left += 2 * size) {
      // Find ending point of left sub array
      // mid+1 is starting point of right sub
      // array
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);

      yield { accesing: [left, right], sound: right };

      // Merge sub array arr[left.....mid] &
      // arr[mid+1....right]
      if (mid < right) {
        yield* merge(arr, left, mid, right);
      }
    }
  }
};
