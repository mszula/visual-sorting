import type { SortingGenerator } from './types';

export const shellSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i]; // 1 read
      let j = i;
      while (j >= gap) {
        if (arr[j - gap] <= temp) {
          yield {
            access: [i, j - gap],
            sound: j - gap,
            comparisons: 1,
            accesses: 1,
          };
          break;
        }
        arr[j] = arr[j - gap]; // shift: 1 read + 1 write
        yield {
          access: [i, j - gap],
          sound: j - gap,
          comparisons: 1,
          accesses: 3,
        };
        j -= gap;
      }
      arr[j] = temp;
      yield { access: [i, j], sound: j, accesses: 1 };
    }
  }
};
