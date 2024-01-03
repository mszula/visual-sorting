import type { SortingGenerator } from "./types";

export const countingSort = function* (arr: number[]): SortingGenerator {
  let j = 0,
    max = arr[0],
    count = [];

  for (let i = 0; i < arr.length; i++) {
    yield { accesing: [i], sound: i };
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  for (let i = 0; i <= max; i++) {
    yield { accesing: [i], sound: i };
    count[i] = 0;
  }

  for (let i = 0; i < arr.length; i++) {
    yield { accesing: [i], sound: i };
    count[arr[i]] += 1;
  }

  console.log(count);
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      yield { accesing: [j], sound: j };
      arr[j] = i;
      j++;
      count[i]--;
    }
  }
};
