import type { SortingGenerator } from "./types";

// an index in arr[]. n is size of heap
const heapify = function* (
  arr: number[],
  N: number,
  i: number
): SortingGenerator {
  let largest = i; // Initialize largest as root
  let l = 2 * i + 1; // left = 2*i + 1
  let r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < N && arr[l] > arr[largest]) {
    yield { access: [l, largest], sound: l };
    largest = l;
  }

  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest]) {
    yield { access: [r, largest], sound: r };
    largest = r;
  }

  // If largest is not root
  if (largest != i) {
    yield { access: [i, largest], sound: i };
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    yield* heapify(arr, N, largest);
  }
};

export const heapSort = function* (arr: number[]): SortingGenerator {
  let N = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, N, i);
  }

  // One by one extract an element from heap
  for (let i = N - 1; i > 0; i--) {
    yield { access: [0, i], sound: i };
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // call max heapify on the reduced heap
    yield* heapify(arr, i, 0);
  }
};
