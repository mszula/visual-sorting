import type { SortElement } from "../types";

export const bubleSort = function* (arr: SortElement[]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const first = arr[j];
      const second = arr[j + 1];
      first.processing = true;
      first.makeSound = true;
      second.processing = true;

      yield arr;

      if (arr[j].value > arr[j + 1].value) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }

      first.processing = false;
      first.makeSound = false;
      second.processing = false;
    }
  }

  return arr;
};
