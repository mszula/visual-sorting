import type { SortingGenerator } from "./types";

const merge = function* (
  arr: number[],
  l: number,
  m: number,
  r: number
): SortingGenerator {
  const n1 = m - l + 1;
  const n2 = r - m;

  const left = new Array(n1);
  const right = new Array(n2);

  // Copy data to temp arrays left[] and right[]
  for (let i = 0; i < n1; i++) {
    left[i] = arr[l + i];
  }
  for (let j = 0; j < n2; j++) {
    right[j] = arr[m + 1 + j];
  }

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = l;

  while (i < n1 && j < n2) {
    yield { access: [k], sound: k };
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = left[i];
    yield { access: [k], sound: k };
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = right[j];
    yield { access: [k], sound: k };
    j++;
    k++;
  }
};

const mergeSortStart = function* (
  arr: number[],
  l: number,
  r: number
): SortingGenerator {
  if (l < r) {
    const m = l + Math.floor((r - l) / 2);
    yield* mergeSortStart(arr, l, m);
    yield* mergeSortStart(arr, m + 1, r);
    yield* merge(arr, l, m, r);
  }
};

export const mergeSort = function* (arr: number[]): SortingGenerator {
  yield* mergeSortStart(arr, 0, arr.length - 1);
};
