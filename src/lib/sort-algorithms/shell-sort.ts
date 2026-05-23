import type { SortingGenerator } from './types';

export const shellSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  // Tokuda's gap sequence: 1, 4, 9, 20, 46, 103, 233, 525, ...
  // Much better worst case than Shell's original n/2, n/4, ... split.
  const gaps: number[] = [];
  for (let k = 0; ; k++) {
    const gap = Math.ceil((9 * Math.pow(9 / 4, k) - 4) / 5);
    if (gap >= n) break;
    gaps.push(gap);
  }

  for (let g = gaps.length - 1; g >= 0; g--) {
    const gap = gaps[g];
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
