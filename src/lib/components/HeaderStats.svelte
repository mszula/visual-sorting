<script lang="ts">
  import type { SortStats } from '../types';

  export let stats: SortStats;

  const fmt = (n: number) => n.toLocaleString();
</script>

<div
  class="hidden md:flex items-center gap-3 lg:gap-5 text-xs font-mono px-2"
  aria-live="polite"
>
  <div
    class="tooltip tooltip-bottom flex flex-col items-end leading-tight"
    data-tip="Comparisons — element-to-element comparisons performed"
  >
    <span class="opacity-50 text-[0.6rem] uppercase tracking-wider">Cmp</span>
    <span class="tabular-nums">{fmt(stats.comparisons)}</span>
  </div>
  <div
    class="tooltip tooltip-bottom flex flex-col items-end leading-tight"
    data-tip="Swaps — full element exchanges performed"
  >
    <span class="opacity-50 text-[0.6rem] uppercase tracking-wider">Swp</span>
    <span class="tabular-nums">{fmt(stats.swaps)}</span>
  </div>
  <div
    class="tooltip tooltip-bottom flex flex-col items-end leading-tight"
    data-tip="Array accesses — total reads and writes on the array"
  >
    <span class="opacity-50 text-[0.6rem] uppercase tracking-wider">Acc</span>
    <span class="tabular-nums">{fmt(stats.accesses)}</span>
  </div>
</div>
