import type { SortingGenerator } from "./types";

/* The parameter dir indicates the sorting direction,
    ASCENDING or DESCENDING; if (a[i] > a[j]) agrees
    with the direction, then a[i] and a[j] are
    interchanged. */
const compAndSwap = function* (
  arr: number[],
  i: number,
  j: number,
  dir: number
): SortingGenerator {
  if ((arr[i] > arr[j] && dir === 1) || (arr[i] < arr[j] && dir === 0)) {
    yield { accesing: [i, j], sound: i };
    // Swapping elements
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

/* It recursively sorts a bitonic sequence in ascending
    order, if dir = 1, and in descending order otherwise
    (means dir=0). The sequence to be sorted starts at
    index position low, the parameter cnt is the number
    of elements to be sorted.*/
const bitonicMerge = function* (
  arr: number[],
  low: number,
  cnt: number,
  dir: number
): SortingGenerator {
  if (cnt > 1) {
    const k = Math.floor(cnt / 2);
    for (var i = low; i < low + k; i++) {
      yield* compAndSwap(arr, i, i + k, dir);
    }
    yield* bitonicMerge(arr, low, k, dir);
    yield* bitonicMerge(arr, low + k, k, dir);
  }
};

/* This function first produces a bitonic sequence by
    recursively sorting its two halves in opposite sorting
    orders, and then calls bitonicMerge to make them in
    the same order */
const sort = function* (
  arr: number[],
  low: number,
  cnt: number,
  dir: number
): SortingGenerator {
  if (cnt > 1) {
    const k = Math.floor(cnt / 2);

    // sort in ascending order since dir here is 1
    yield* sort(arr, low, k, 1);

    // sort in descending order since dir here is 0
    yield* sort(arr, low + k, k, 0);

    // Will merge whole sequence in ascending order
    // since dir=1.
    yield* bitonicMerge(arr, low, cnt, dir);
  }
};

export const bitonicSort = function* (arr: number[]): SortingGenerator {
  yield* sort(arr, 0, arr.length, 1);
};
