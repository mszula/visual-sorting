import { bubleSort } from "./buble-sort";
import { quickSort } from "./quick-sort";
import type { AlgorithmDefinition } from "./types";

export const algorithms: AlgorithmDefinition[] = [
  {
    name: "Bubble sort",
    function: bubleSort,
  },
  {
    name: "Quick sort",
    function: quickSort,
  },
];
