import type { SortingGenerator } from './types';

function* partition(items: number[], left: number, right: number) {
  const pivot = items[left + Math.floor((right - left) / 2)]; // 1 read
  let i = left;
  let j = right;
  while (i <= j) {
    while (items[i] < pivot) {
      yield {
        access: [i, j],
        sound: i,
        comparisons: 1,
        accesses: 1,
      };
      i++;
    }
    // exit comparison for inner while
    yield {
      access: [i, j],
      sound: i,
      comparisons: 1,
      accesses: 1,
    };
    while (items[j] > pivot) {
      yield {
        access: [i, j],
        sound: j,
        comparisons: 1,
        accesses: 1,
      };
      j--;
    }
    yield {
      access: [i, j],
      sound: j,
      comparisons: 1,
      accesses: 1,
    };
    if (i <= j) {
      const temp = items[i];
      items[i] = items[j];
      items[j] = temp;
      yield {
        access: [i, j],
        sound: j,
        swaps: 1,
        accesses: 4,
      };
      i++;
      j--;
    }
  }
  return i;
}

function* qc(items: number[], left: number, right: number): SortingGenerator {
  let index;
  if (items.length > 1) {
    index = yield* partition(items, left, right);
    if (left < index - 1) {
      yield* qc(items, left, index - 1);
    }
    if (index < right) {
      yield* qc(items, index, right);
    }
  }
}

export const quickSort = function* (arr: number[]): SortingGenerator {
  yield* qc(arr, 0, arr.length - 1);
};
