import type { SortingGenerator } from './types';

/**
 * Counting Sort Algorithm
 *
 * A non-comparison sorting algorithm that works by counting the number of objects
 * having distinct key values. It operates by counting the number of objects that
 * have each distinct key value, and using arithmetic on those counts to determine
 * the positions of each key value in the output sequence.
 *
 * Time Complexity: O(n + k) where n is the number of elements and k is the range of input
 * Space Complexity: O(k)
 *
 * @param arr - Array of numbers to sort
 * @yields ProgressIndicator - Visualization data for each step
 */
export const countingSort = function* (arr: number[]): SortingGenerator {
  if (arr.length === 0) return;

  // Find the maximum value in the array
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    yield { access: [i], sound: i };
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  // Create count array with size max + 1
  const count = new Array(max + 1).fill(0);

  // Count the frequency of each element
  for (let i = 0; i < arr.length; i++) {
    yield { access: [i], sound: i };
    count[arr[i]]++;
  }

  // Modify count array to store cumulative count
  for (let i = 1; i <= max; i++) {
    yield { access: [i - 1], sound: i - 1 };
    count[i] += count[i - 1];
  }

  // Create output array
  const output = new Array(arr.length);

  // Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    yield { access: [i], sound: i };
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }

  // Copy the output array back to the original array
  for (let i = 0; i < arr.length; i++) {
    yield { access: [i], sound: i };
    arr[i] = output[i];
  }
};
