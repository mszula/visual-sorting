import type { SortingGenerator } from './types';

const heapify = function* (
  arr: number[],
  N: number,
  i: number
): SortingGenerator {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  let comparisons = 0;
  let accesses = 0;

  if (l < N) {
    comparisons++;
    accesses += 2;
    if (arr[l] > arr[largest]) {
      yield {
        access: [l, largest],
        sound: l,
        comparisons: 1,
        accesses: 2,
      };
      largest = l;
      comparisons = 0;
      accesses = 0;
    }
  }

  if (r < N) {
    comparisons++;
    accesses += 2;
    if (arr[r] > arr[largest]) {
      yield {
        access: [r, largest],
        sound: r,
        comparisons,
        accesses,
      };
      largest = r;
      comparisons = 0;
      accesses = 0;
    }
  }

  if (largest != i) {
    const swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    yield {
      access: [i, largest],
      sound: i,
      comparisons,
      swaps: 1,
      accesses: accesses + 4,
    };

    yield* heapify(arr, N, largest);
  } else if (comparisons > 0) {
    yield {
      access: [i],
      sound: i,
      comparisons,
      accesses,
    };
  }
};

export const heapSort = function* (arr: number[]): SortingGenerator {
  const N = arr.length;

  // Build heap
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, N, i);
  }

  // Extract elements
  for (let i = N - 1; i > 0; i--) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    yield {
      access: [0, i],
      sound: i,
      swaps: 1,
      accesses: 4,
    };

    yield* heapify(arr, i, 0);
  }
};
