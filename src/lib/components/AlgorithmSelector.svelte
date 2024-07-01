<script lang="ts">
  import { onMount } from 'svelte';
  export let selectAlgorithm: (algo: AlgorithmDefinition) => void;
  import { algorithms } from '../sort-algorithms/algorithms';
  import type { AlgorithmDefinition } from '../sort-algorithms/types';
  import ArrowRight from './algorithm-selector/ArrowRight.svelte';
  import ArrowLeft from './algorithm-selector/ArrowLeft.svelte';

  let selected = 0;
  let selectedGroup = 0;

  const click = (group: number, index: number) => () => {
    selected = index;
    selectedGroup = group;
    selectAlgorithm(algorithms[group][index]);
  };

  onMount(() => {
    selectAlgorithm(algorithms[selectedGroup][selected]);
  });
</script>

<div class="flex bg-base-200 rounded-box mb-2 md:mb-0 md:mr-5">
  <div class="carousel rounded-box md:w-[30.5rem]">
    {#each algorithms as algos, group}
      <div id="group{group}" class="carousel-item w-full">
        <ul class="menu flex flex-row md:grid md:grid-rows-4 grid-flow-col">
          {#each algos as algo, index}
            <li>
              <button
                class={selected === index && selectedGroup === group
                  ? 'active'
                  : ''}
                on:click={click(group, index)}>{algo.name}</button
              >
            </li>
            {#if index === 2 && group > 0}
              <ArrowLeft {group} />
            {/if}
          {/each}
          {#if group !== algorithms.length - 1}
            <ArrowRight {group} />
          {/if}
        </ul>
      </div>
    {/each}
  </div>
</div>
