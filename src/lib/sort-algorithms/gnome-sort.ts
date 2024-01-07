import type { SortingGenerator } from "./types";

export const gnomeSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;
  let index = 0;

  while (index < n) {
    if (index == 0 || arr[index] >= arr[index - 1]) {
      yield { access: [index], sound: index };
      index++;
    } else {
      yield { access: [index, index - 1], sound: index - 1 };
      let temp = 0;
      temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
      index--;
    }
  }
};
