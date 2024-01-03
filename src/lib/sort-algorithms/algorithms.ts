import { bubleSort } from "./buble-sort";
import { countingSort } from "./counting-sort";
import { insertionSort } from "./insertion-sort";
import { mergeSort } from "./merge-sort";
import { quickSort } from "./quick-sort";
import { radixSort } from "./radix-sort";
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
  {
    name: "Merge Sort",
    function: mergeSort,
  },
  {
    name: "Counting Sort",
    function: countingSort,
  },
  {
    name: "Radix Sort",
    function: radixSort,
  },
];
