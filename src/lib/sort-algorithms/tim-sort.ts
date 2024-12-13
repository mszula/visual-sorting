import type { SortingGenerator } from "./types";

/**
 * The size at or below which a run is considered "small" and
 * will be extended using insertion sort rather than merges.
 * Traditionally, Timsort uses a minRun between 32 and 64.
 */
const MIN_MERGE = 32;

/**
 * Computes the minimum run length for Timsort given an array length.
 * This follows Timsort's logic:
 * - Repeatedly shift right until n < MIN_MERGE.
 * - Track if any bits were shifted off (r), and add that to final result.
 */
function minRunLength(n: number): number {
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}

/**
 * Sorts a subarray using insertion sort.
 * This is used by Timsort to extend small runs to ensure they are at least minRun long.
 * 
 * @param arr - The array to sort.
 * @param start - Start index of the subarray.
 * @param end - End index of the subarray (inclusive).
 */
function* insertionSort(
  arr: number[],
  start: number,
  end: number
): SortingGenerator {
  for (let i = start + 1; i <= end; i++) {
    const temp = arr[i];
    let j = i - 1;
    while (j >= start && arr[j] > temp) {
      yield { access: [i, j], sound: j };
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

/**
 * Scans forward from `start` to find a run (ascending or strictly descending).
 * If run is descending, it is reversed.
 * Returns the end index of the run (inclusive).
 * 
 * @param arr - The array.
 * @param start - Start index to detect run.
 * @param n - Total length of the array.
 */
function* countRunAndMakeAscending(
  arr: number[],
  start: number,
  n: number
): SortingGenerator<number> {
  let runEnd = start + 1;
  if (runEnd === n) {
    // Single element run
    return start;
  }

  // Determine if run is ascending or descending
  yield { access: [start, runEnd], sound: runEnd };
  if (arr[start] <= arr[runEnd]) {
    // Ascending run
    while (runEnd < n - 1 && arr[runEnd] <= arr[runEnd + 1]) {
      yield { access: [runEnd, runEnd + 1], sound: runEnd + 1 };
      runEnd++;
    }
  } else {
    // Descending run
    while (runEnd < n - 1 && arr[runEnd] > arr[runEnd + 1]) {
      yield { access: [runEnd, runEnd + 1], sound: runEnd + 1 };
      runEnd++;
    }

    // Reverse the descending run
    let left = start;
    let right = runEnd;
    while (left < right) {
      yield { access: [left, right], sound: left };
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return runEnd;
}

/**
 * Merges two sorted sub-runs:
 *   arr[start..mid] and arr[mid+1..end]
 * 
 * This is a standard merging procedure but may be enhanced with Timsort's "galloping" optimization.
 * For simplicity, we will not implement galloping here, just a standard merge.
 * 
 * @param arr - The array.
 * @param start - Start index of first run.
 * @param mid - End index of first run.
 * @param end - End index of second run.
 */
function* merge(
  arr: number[],
  start: number,
  mid: number,
  end: number
): SortingGenerator {
  const len1 = mid - start + 1;
  const len2 = end - mid;
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);

  let i = 0;
  let j = 0;
  let k = start;

  while (i < len1 && j < len2) {
    yield { access: [k], sound: k };
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
  }

  while (i < len1) {
    yield { access: [k], sound: k };
    arr[k++] = left[i++];
  }

  while (j < len2) {
    yield { access: [k], sound: k };
    arr[k++] = right[j++];
  }
}

/**
 * Timsort main function:
 * 
 * Steps:
 * 1. Calculate minRun.
 * 2. Identify natural runs, extend them to length at least minRun with insertion sort.
 * 3. Push these runs to a stack.
 * 4. Merge runs from the stack according to Timsort’s merge rules until only one run remains.
 */
export function* timSort(arr: number[]): SortingGenerator {
  const n = arr.length;
  if (n < 2) {
    return;
  }

  const minRun = minRunLength(n);

  // This stack will store runs as [startIndex, length]
  const runStack: Array<[number, number]> = [];

  let current = 0;
  while (current < n) {
    // Identify run
    const runEnd = yield* countRunAndMakeAscending(arr, current, n);
    let runLen = runEnd - current + 1;

    // Ensure run has length at least minRun
    if (runLen < minRun) {
      const forceLen = Math.min(minRun, n - current);
      // Sort the small run using insertion sort
      yield* insertionSort(arr, current, current + forceLen - 1);
      runLen = forceLen;
    }

    // Push run onto stack
    runStack.push([current, runLen]);

    // Timsort merging rules:
    // While we have at least two runs on the stack:
    // Check if merging is required according to Timsort constraints.
    while (runStack.length > 1) {
      const n = runStack.length;
      const [baseZ, lenZ] = runStack[n - 1];
      const [baseY, lenY] = runStack[n - 2];

      const shouldMerge =
        (n > 2 &&
          runStack[n - 3][1] <= runStack[n - 2][1] + runStack[n - 1][1]) ||
        (lenY <= lenZ);

      if (!shouldMerge) break;

      if (n > 2) {
        // Compare also run Y and run X (the ones below)
        const [baseX, lenX] = runStack[n - 3];
        if (lenX <= lenY + lenZ) {
          // Merge Y with smaller of Z or X
          if (lenX < lenZ) {
            yield* doMerge(arr, runStack, n - 3, n - 2);
          } else {
            yield* doMerge(arr, runStack, n - 2, n - 1);
          }
          continue;
        }
      }

      yield* doMerge(arr, runStack, n - 2, n - 1);
    }

    current += runLen;
  }

  // Merge all remaining runs
  while (runStack.length > 1) {
    const n = runStack.length;
    // Merge the last two runs
    yield* doMerge(arr, runStack, n - 2, n - 1);
  }
}

/**
 * Merges the runs at runStack[i] and runStack[i+1] and replaces them with a single run.
 */
function* doMerge(
  arr: number[],
  runStack: Array<[number, number]>,
  i: number,
  j: number
): SortingGenerator {
  const [base1, len1] = runStack[i];
  const [base2, len2] = runStack[j];

  yield { access: [base1, base2], sound: base2 };

  // Merge runs arr[base1..base1+len1-1] and arr[base2..base2+len2-1]
  yield* merge(arr, base1, base1 + len1 - 1, base1 + len1 + len2 - 1);

  // Update the run stack, replacing the two runs with the merged run
  runStack[i] = [base1, len1 + len2];
  runStack.splice(j, 1);
}
