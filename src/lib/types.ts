export type SortElement = {
  value: number;
  access: boolean;
  makeSound: boolean;
};

export type ProgressIndicator = {
  access: number[]; // list of processing indexes
  sound?: number; // which bar should play a sound
};
