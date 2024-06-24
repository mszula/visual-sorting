<script lang="ts">
  import { onMount } from 'svelte';
  export let selectAlgorithm: (algo: AlgorithmDefinition) => void;
  import { algorithms } from '../sort-algorithms/algorithms';
  import type { AlgorithmDefinition } from '../sort-algorithms/types';

  let selected = 0;

  const click = (index: number) => () => {
    selected = index;
    selectAlgorithm(algorithms[index]);
  };

  onMount(() => {
    selectAlgorithm(algorithms[selected]);
  });
</script>

<div class="flex bg-base-200 rounded-box mb-2 md:mb-0 md:mr-5">
  <ul class="menu menu-horizontal md:menu-vertical xl:h-40">
    {#each algorithms as algo, index}
      <li>
        <button
          class={selected === index ? 'active' : ''}
          on:click={click(index)}>{algo.name}</button
        >
      </li>
    {/each}
  </ul>
</div>
