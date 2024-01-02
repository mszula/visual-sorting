import { bubleSort } from "./buble-sort";
import { insertionSort } from "./insertion-sort";
import { quickSort } from "./quick-sort";
import type { AlgorithmDefinition } from "./types";

export const algorithms: AlgorithmDefinition[] = [
  {
    name: "Bubble Sort",
    function: bubleSort,
  },
  {
    name: "Insertion Sort",
    function: insertionSort,
  },
  {
    name: "Quick Sort",
    function: quickSort,
  },
];
