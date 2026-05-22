import type { ProgressIndicator } from '../types';
import type { SortingGenerator } from './types';

/**
 * Intro Sort (Introsort) Algorithm
 *
 * A hybrid sorting algorithm that combines Quick Sort, Heap Sort, and Insertion Sort.
 * It starts with Quick Sort, switches to Heap Sort when the recursion depth becomes
 * too deep, and uses Insertion Sort for small subarrays.
 *
 * Time Complexity: O(n log n) guaranteed worst case
 * Space Complexity: O(log n)
 *
 * @param arr - Array of numbers to sort
 * @yields ProgressIndicator - Visualization data for each step
 */
export const introSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;
  if (n <= 1) return;

  // Calculate maximum recursion depth (2 * log2(n))
  const maxDepth = Math.floor(2 * Math.log2(n));

  yield* introSortRecursive(arr, 0, n - 1, maxDepth);
};

function* introSortRecursive(
  arr: number[],
  low: number,
  high: number,
  depthLimit: number
): SortingGenerator {
  const size = high - low + 1;

  // Use insertion sort for small arrays
  if (size < 16) {
    yield* insertionSort(arr, low, high);
    return;
  }

  // If depth limit reached, switch to heap sort
  if (depthLimit === 0) {
    yield* heapSortRange(arr, low, high);
    return;
  }

  // Use quick sort for larger arrays
  const pivotIndex = yield* partition(arr, low, high);

  // Recursively sort the two partitions
  yield* introSortRecursive(arr, low, pivotIndex - 1, depthLimit - 1);
  yield* introSortRecursive(arr, pivotIndex + 1, high, depthLimit - 1);
}

function* partition(
  arr: number[],
  low: number,
  high: number
): Generator<ProgressIndicator, number, unknown> {
  const pivotIndex = Math.floor((low + high) / 2);
  const pivot = arr[pivotIndex];

  [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];
  yield {
    access: [pivotIndex, high],
    sound: high,
    swaps: 1,
    accesses: 4,
  };

  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield {
          access: [i, j],
          sound: j,
          comparisons: 1,
          swaps: 1,
          accesses: 5, // 1 read for compare + 4 for swap
        };
      } else {
        yield {
          access: [j],
          sound: j,
          comparisons: 1,
          accesses: 1,
        };
      }
    } else {
      yield {
        access: [j],
        sound: j,
        comparisons: 1,
        accesses: 1,
      };
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  yield {
    access: [i + 1, high],
    sound: high,
    swaps: 1,
    accesses: 4,
  };

  return i + 1;
}

function* insertionSort(
  arr: number[],
  low: number,
  high: number
): SortingGenerator {
  for (let i = low + 1; i <= high; i++) {
    const key = arr[i];
    let j = i - 1;

    yield { access: [i], sound: i, accesses: 1 };

    while (j >= low) {
      if (arr[j] <= key) {
        yield {
          access: [j, j + 1],
          sound: j + 1,
          comparisons: 1,
          accesses: 1,
        };
        break;
      }
      arr[j + 1] = arr[j];
      yield {
        access: [j, j + 1],
        sound: j + 1,
        comparisons: 1,
        accesses: 3,
      };
      j--;
    }

    if (j + 1 !== i) {
      arr[j + 1] = key;
      yield { access: [j + 1], sound: j + 1, accesses: 1 };
    }
  }
}

function* heapSortRange(
  arr: number[],
  low: number,
  high: number
): SortingGenerator {
  const n = high - low + 1;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, low, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[low], arr[low + i]] = [arr[low + i], arr[low]];
    yield {
      access: [low, low + i],
      sound: low + i,
      swaps: 1,
      accesses: 4,
    };

    yield* heapify(arr, low, i, 0);
  }
}

function* heapify(
  arr: number[],
  low: number,
  n: number,
  i: number
): SortingGenerator {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let comparisons = 0;
  let accesses = 0;

  if (left < n) {
    comparisons++;
    accesses += 2;
    if (arr[low + left] > arr[low + largest]) {
      largest = left;
    }
  }

  if (right < n) {
    comparisons++;
    accesses += 2;
    if (arr[low + right] > arr[low + largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    [arr[low + i], arr[low + largest]] = [arr[low + largest], arr[low + i]];
    yield {
      access: [low + i, low + largest],
      sound: low + largest,
      comparisons,
      swaps: 1,
      accesses: accesses + 4,
    };

    yield* heapify(arr, low, n, largest);
  } else if (comparisons > 0) {
    // emit the comparisons even when no swap occurs
    yield {
      access: [low + i],
      sound: low + i,
      comparisons,
      accesses,
    };
  }
}
