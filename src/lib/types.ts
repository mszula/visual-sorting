export type SortElement = {
  value: number;
  accesing: boolean;
  makeSound: boolean;
};

export type ProgressIndicator = {
  accesing: number[]; // list of processing indexes
  sound?: number; // whitch bar should play a sound
};
