<script lang="ts">
  import { onMount } from "svelte";
  export let selectAlgorithm: (algo: AlgorithmDefinition) => void;
  import { algorithms } from "../sort-algorithms/algorithms";
  import type { AlgorithmDefinition } from "../sort-algorithms/types";

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
  <ul class="menu menu-horizontal md:menu-vertical md:grid md:grid-cols-2">
    {#each algorithms as algo, index}
      <li>
        <button
          class={selected === index ? "active" : ""}
          on:click={click(index)}>{algo.name}</button
        >
      </li>
    {/each}
    <!-- 
    <li class="disabled"><button>Selection sort</button></li>
    <li class="disabled"><button>Insertion sort</button></li>
    <li><button>Quick sort</button></li>
    <li class="disabled"><button>Merge sort</button></li> -->
  </ul>
  <!-- <ul class="menu">
    <li class="disabled"><button>Coctail shaker sort</button></li>
    <li class="disabled"><button>Shell sort</button></li>
    <li class="disabled"><button>Radix sort</button></li>
    <li class="disabled"><button>Bogo sort</button></li>
  </ul> -->
</div>
