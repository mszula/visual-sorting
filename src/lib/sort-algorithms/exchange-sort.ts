import type { SortingGenerator } from './types';

export const exchangeSort = function* (arr: number[]): SortingGenerator {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      yield { access: [i, j], sound: j };

      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
};
