import { bubleSort } from "./buble-sort";
import { insertionSort } from "./insertion-sort";
import { quickSort } from "./quick-sort";
import { selectionSort } from "./selection-sort";
import { shellSort } from "./shell-sort";
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
    name: "Selection Sort",
    function: selectionSort,
  },
  {
    name: "Quick Sort",
    function: quickSort,
  },
  {
    name: "Shell Sort",
    function: shellSort,
  },
];
