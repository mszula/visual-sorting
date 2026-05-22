import type { SortingGenerator } from './types';

// Function sort the array using Cycle sort
export const cycleSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  // traverse array elements and put it to on
  // the right place
  for (let cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
    let item = arr[cycle_start];

    let pos = cycle_start;
    for (let i = cycle_start + 1; i < n; i++) {
      if (arr[i] < item) pos++;
      yield {
        access: [cycle_start, i],
        sound: i,
        comparisons: 1,
        accesses: 1,
      };
    }

    if (pos == cycle_start) continue;

    while (item == arr[pos]) pos += 1;

    if (pos != cycle_start) {
      const temp = item;
      item = arr[pos];
      arr[pos] = temp;
      yield {
        access: [cycle_start, pos],
        sound: pos,
        swaps: 1,
        accesses: 4,
      };
    }

    while (pos != cycle_start) {
      pos = cycle_start;

      for (let i = cycle_start + 1; i < n; i++) {
        if (arr[i] < item) pos += 1;
        yield {
          access: [cycle_start, i],
          sound: i,
          comparisons: 1,
          accesses: 1,
        };
      }

      while (item == arr[pos]) pos += 1;

      if (item != arr[pos]) {
        const temp = item;
        item = arr[pos];
        arr[pos] = temp;
        yield {
          access: [cycle_start, pos],
          sound: pos,
          swaps: 1,
          accesses: 4,
        };
      }
    }
  }
};
