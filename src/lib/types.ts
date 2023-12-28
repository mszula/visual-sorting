export type SortElement = {
  value: number;
  accesing: boolean;
  processing: boolean;
  makeSound: boolean;
};

export type ProgressIndicator = {
  accesing: number[]; // list of processing indexes
  processing: number[]; // list of processing indexes
};
