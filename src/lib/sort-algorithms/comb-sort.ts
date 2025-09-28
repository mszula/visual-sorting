import type { SortingGenerator } from './types';

/**
 * Comb Sort Algorithm
 *
 * An improved version of Bubble Sort that uses a gap-based approach.
 * It starts with a large gap and reduces the gap by a shrink factor
 * (typically 1.3) until the gap becomes 1, at which point it becomes
 * a regular Bubble Sort.
 *
 * Time Complexity: O(n²) worst case, O(n log n) average case
 * Space Complexity: O(1)
 *
 * @param arr - Array of numbers to sort
 * @yields ProgressIndicator - Visualization data for each step
 */
export const combSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;
  if (n <= 1) return;

  // Initialize gap
  let gap = n;
  const shrinkFactor = 1.3;
  let swapped = true;

  // Continue until gap is 1 and no swaps occurred
  while (gap > 1 || swapped) {
    // Update gap using shrink factor
    gap = Math.floor(gap / shrinkFactor);
    if (gap < 1) gap = 1;

    swapped = false;

    // Compare elements with current gap
    for (let i = 0; i < n - gap; i++) {
      yield { access: [i, i + gap], sound: i + gap };

      if (arr[i] > arr[i + gap]) {
        // Swap elements
        const temp = arr[i];
        arr[i] = arr[i + gap];
        arr[i + gap] = temp;
        swapped = true;
      }
    }
  }
};
