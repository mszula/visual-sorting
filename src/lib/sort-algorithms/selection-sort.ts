import type { SortingGenerator } from './types';

export const selectionSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
      yield { access: [i, j], sound: j };
    }
    if (min != i) {
      const tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
    }
    yield { access: [i], sound: i };
  }
};
