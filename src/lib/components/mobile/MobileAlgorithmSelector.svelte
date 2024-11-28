<script lang="ts">
  export let selectAlgorithm: (algo: AlgorithmDefinition) => void;
  export let selectedAlgorithm: AlgorithmDefinition;

  import { algorithms } from '../../sort-algorithms/algorithms';
  import type { AlgorithmDefinition } from '../../sort-algorithms/types';

  const change = (value: string) => {
    const [group, index] = value.split(',');
    selectAlgorithm(algorithms[Number(group)][Number(index)]);
  };
</script>

<div class="flex bg-base-200 rounded-box mb-2 md:mb-0 md:mr-5">
  <select
    class="select select-ghost w-full"
    on:change={(e) => change(e.currentTarget.value)}
  >
    {#each algorithms as algos, group}
      {#each algos as algo, index}
        <option
          value={[group, index]}
          selected={algo.name === selectedAlgorithm?.name}>{algo.name}</option
        >
      {/each}
    {/each}
  </select>
</div>
