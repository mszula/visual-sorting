<script lang="ts">
  import {
    emptyStats,
    type SortElement,
    type SortStats,
  } from '../types';
  import type {
    AlgorithmDefinition,
    SortingGenerator,
  } from '../sort-algorithms/types';
  import { playValue, type OscillatorType } from '../sound';
  import BarsRender from './BarsRender.svelte';
  import type { CustomTheme } from 'daisyui';

  export let algorithm: AlgorithmDefinition;
  export let baseArray: number[];
  export let theme: CustomTheme[string];
  export let oscillatorType: OscillatorType;
  // Two-way bound so the parent can read/display stats and completion state.
  export let stats: SortStats = emptyStats();
  export let isDone = false;

  let workingArray: number[] = [];
  let bars: SortElement[] = [];
  let instance: SortingGenerator;

  const initialize = () => {
    workingArray = [...baseArray];
    instance = algorithm.function(workingArray);
    bars = workingArray.map((v) => ({ value: v, access: false }));
    stats = emptyStats();
    isDone = false;
  };

  // Re-initialize whenever the base array or algorithm reference changes.
  $: baseArray, algorithm, initialize();

  /** Advance one step. Returns true when the generator is finished. */
  export const tick = (playSound: boolean): boolean => {
    if (isDone) return true;
    const next = instance.next();
    if (next.done) {
      isDone = true;
      return true;
    }
    if (next.value) {
      bars = workingArray.map((v, i) => ({
        value: v,
        access: next.value!.access.includes(i),
      }));
      stats.comparisons += next.value.comparisons ?? 0;
      stats.swaps += next.value.swaps ?? 0;
      stats.accesses += next.value.accesses ?? next.value.access.length;
      stats = stats;
      if (
        playSound &&
        next.value.sound !== undefined &&
        oscillatorType
      ) {
        playValue(workingArray[next.value.sound]);
      }
    }
    return false;
  };

  /** Recreate the generator and reset stats (used by parent on shuffle / pattern change). */
  export const resetPanel = () => {
    initialize();
  };

  /**
   * Re-arm the generator on the CURRENT working array (no copy from baseArray).
   * Used when the user clicks Start after a previous run finished — they
   * expect the algorithm to run on whatever the array currently looks like
   * (typically sorted), not to silently reshuffle back to the starting state.
   */
  export const restart = () => {
    instance = algorithm.function(workingArray);
    stats = emptyStats();
    isDone = false;
  };
</script>

<div class="flex flex-1 min-w-0 min-h-0">
  <BarsRender {bars} {theme} />
</div>
