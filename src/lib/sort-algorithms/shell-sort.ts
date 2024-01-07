import type { SortingGenerator } from "./types";

export const shellSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];

        yield { access: [i, j - gap], sound: j - gap };
      }

      arr[j] = temp;

      yield { access: [i, j], sound: j };
    }
  }
};
