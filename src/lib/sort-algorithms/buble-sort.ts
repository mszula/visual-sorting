import { delay } from "../delay";
import type { SortElement } from "../types";
import type { SortContext } from "./types";

export const bubleSort = (ctx: SortContext) => async (arr: SortElement[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].value > arr[j + 1].value) {
        const first = arr[j];
        const second = arr[j + 1];
        first.processing = true;
        first.makeSound = true;
        second.processing = true;

        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        ctx.updateBars(arr);
        if (ctx.isStopped()) {
          return arr;
        }

        await delay(ctx.delayValue());

        first.processing = false;
        first.makeSound = false;
        second.processing = false;
      }

      ctx.updateBars(arr);
    }
  }

  return arr;
};
