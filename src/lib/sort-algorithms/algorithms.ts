import RangeArraySizePowerOfTwo from '../components/RangeArraySizePowerOfTwo.svelte';
import { bitonicSort } from './bitonic-sort';
import { bogoSort } from './bogo-sort';
import { bubleSort } from './buble-sort';
import { cocktailSort } from './cocktail-sort';
import { combSort } from './comb-sort';
import { countingSort } from './counting-sort';
import { cycleSort } from './cycle-sort';
import { exchangeSort } from './exchange-sort';
import { gnomeSort } from './gnome-sort';
import { heapSort } from './heap-sort';
import { insertionSort } from './insertion-sort';
import { introSort } from './intro-sort';
import { mergeSort } from './merge-sort';
import { oddEvenSort } from './odd-even-sort';
import { pancakeSort } from './pancake-sort';
import { quickSort } from './quick-sort';
import { radixSort } from './radix-sort';
import { radixSortMSD } from './radix-sort-msd';
import { selectionSort } from './selection-sort';
import { shellSort } from './shell-sort';
import { stoogeSort } from './stooge-sort';
import { timSort } from './tim-sort';
import type { AlgorithmDefinition } from './types';

export const algorithms: AlgorithmDefinition[][] = [
  [
    {
      name: 'Bubble Sort',
      function: bubleSort,
    },
    {
      name: 'Quick Sort',
      function: quickSort,
    },
    {
      name: 'Shell Sort',
      function: shellSort,
    },
    {
      name: 'Merge Sort',
      function: mergeSort,
    },
    {
      name: 'Insertion Sort',
      function: insertionSort,
    },
    {
      name: 'Selection Sort',
      function: selectionSort,
    },
    {
      name: 'Radix LSD Sort',
      function: radixSort,
    },
    {
      name: 'Radix MSD Sort',
      function: radixSortMSD,
    },
    {
      name: 'Heap Sort',
      function: heapSort,
    },
    {
      name: 'Bitonic Sort',
      function: bitonicSort,
      arraySizeComponent: RangeArraySizePowerOfTwo,
    },
    {
      name: 'Tim Sort',
      function: timSort,
    },
    {
      name: 'Gnome Sort',
      function: gnomeSort,
    },
    {
      name: 'Cycle Sort',
      function: cycleSort,
    },
    {
      name: 'Cocktail Sort',
      function: cocktailSort,
    },
    {
      name: 'Pancake Sort',
      function: pancakeSort,
    },
  ],
  [
    {
      name: 'Stooge Sort',
      function: stoogeSort,
    },
    {
      name: 'Bogo Sort',
      function: bogoSort,
    },
    {
      name: 'Exchange Sort',
      function: exchangeSort,
    },
    {
      name: 'Odd Even Sort',
      function: oddEvenSort,
    },
    {
      name: 'Counting Sort',
      function: countingSort,
      badge: 'new',
    },
    {
      name: 'Comb Sort',
      function: combSort,
      badge: 'new',
    },
    {
      name: 'Intro Sort',
      function: introSort,
      badge: 'new',
    },
  ],
];
