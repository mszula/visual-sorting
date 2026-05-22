export type SortElement = {
  value: number;
  access: boolean;
};

export type ProgressIndicator = {
  access: number[]; // list of processing indexes (for highlighting)
  sound?: number; // which bar should play a sound
  comparisons?: number; // delta: comparisons performed since previous yield
  swaps?: number; // delta: full element swaps performed since previous yield
  accesses?: number; // delta: explicit override; defaults to access.length
};

export type SortStats = {
  comparisons: number;
  swaps: number;
  accesses: number;
};

export const emptyStats = (): SortStats => ({
  comparisons: 0,
  swaps: 0,
  accesses: 0,
});
