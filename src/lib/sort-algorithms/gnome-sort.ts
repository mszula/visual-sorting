import type { SortingGenerator } from './types';

export const gnomeSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;
  let index = 0;

  while (index < n) {
    const cmp = index === 0 ? 0 : 1;
    if (index == 0 || arr[index] >= arr[index - 1]) {
      yield {
        access: [index],
        sound: index,
        comparisons: cmp,
        accesses: cmp === 1 ? 2 : 1,
      };
      index++;
    } else {
      let temp = 0;
      temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
      yield {
        access: [index, index - 1],
        sound: index - 1,
        comparisons: 1,
        swaps: 1,
        accesses: 6, // 2 for compare + 4 for swap
      };
      index--;
    }
  }
};
