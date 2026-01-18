<script lang="ts">
  export let selectAlgorithm: (algo: AlgorithmDefinition) => void;
  export let selectedAlgorithm: AlgorithmDefinition;

  import { algorithms } from '../../sort-algorithms/algorithms';
  import type { AlgorithmDefinition } from '../../sort-algorithms/types';
  import { trackEvent } from '../../umami';

  const change = (value: string) => {
    const [group, index] = value.split(',');
    const algo = algorithms[Number(group)][Number(index)];
    selectAlgorithm(algo);
    trackEvent('algorithm-selected', { algorithm: algo.name, device: 'mobile' });
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
          selected={algo.name === selectedAlgorithm?.name}
        >
          {algo.name}{#if algo.badge}
            ({algo.badge}){/if}
        </option>
      {/each}
    {/each}
  </select>
</div>
