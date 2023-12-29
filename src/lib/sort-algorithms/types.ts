import type { ProgressIndicator, SortElement } from "../types";

export type SortContext = {
  updateBars: (b: SortElement[]) => void;
  isStopped: () => boolean;
  delayValue: () => number;
};

export type SortingGenerator = Generator<ProgressIndicator, void, unknown>;

export type AlgorithmDefinition = {
  name: string;
  function: (arr: number[]) => SortingGenerator;
};
