import type { SortingGenerator } from './types';

// Function sort the array using Cycle sort
export const cycleSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  // traverse array elements and put it to on
  // the right place
  for (let cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
    // initialize item as starting point
    let item = arr[cycle_start];

    // Find position where we put the item. We basically
    // count all smaller elements on right side of item.
    let pos = cycle_start;
    for (let i = cycle_start + 1; i < n; i++) {
      yield { access: [cycle_start, i], sound: i };
      if (arr[i] < item) pos++;
    }

    // If item is already in correct position
    if (pos == cycle_start) continue;

    // ignore all duplicate elements
    while (item == arr[pos]) pos += 1;

    // put the item to it's right position
    if (pos != cycle_start) {
      //   yield { access: [cycle_start, pos], sound: pos };
      const temp = item;
      item = arr[pos];
      arr[pos] = temp;
    }

    // Rotate rest of the cycle
    while (pos != cycle_start) {
      pos = cycle_start;

      // Find position where we put the element
      for (let i = cycle_start + 1; i < n; i++) {
        yield { access: [cycle_start, i], sound: i };
        if (arr[i] < item) pos += 1;
      }

      // ignore all duplicate elements
      while (item == arr[pos]) pos += 1;

      // put the item to it's right position
      if (item != arr[pos]) {
        // yield { access: [cycle_start, pos], sound: pos };
        const temp = item;
        item = arr[pos];
        arr[pos] = temp;
      }
    }
  }
};
