<script lang="ts">
  import { Oscillator } from "tone";
  import Bars from "./lib/Bars.svelte";
  import { generateArray, shuffle } from "./lib/randomized-array-generator";
  import { bubleSort } from "./lib/sort-algorithms/buble-sort";
  import type { SortElement } from "./lib/types";

  let size = 10;
  let stopped = true;
  let delay = 1;
  let freq = 0;
  let osc: Oscillator = new Oscillator().toDestination();

  $: bars = shuffle(generateArray(size));

  const updateBars = (b: SortElement[]) => (bars = [...b]);
  const delayValue = () => delay;
  const isStopped = () => stopped;

  $: osc.frequency.value = freq;

  const click = async () => {
    osc.type = "square"; // rodzaj oscylatora
    osc.frequency.value = freq;
    osc.start();

    stopped = false;
    updateBars(await bubleSort({ updateBars, delayValue, isStopped })(bars));
    stopped = true;
  };
</script>

<main>
  <Bars height={500} {bars} {osc} />
  <button on:click={click}>Sort</button>
  <button on:click={() => (stopped = true)}>Stop</button>
  <input
    type="range"
    id="size"
    name="size"
    min="2"
    max="1000"
    bind:value={size}
  />
  <label for="size">Size</label>
  <input
    type="range"
    id="delay"
    name="delay"
    min="0"
    max="1000"
    bind:value={delay}
  />
  <label for="delay">Delay</label>
  <input
    type="range"
    id="freq"
    name="freq"
    min="0"
    max="5000"
    step="1"
    bind:value={freq}
  />
  <label for="freq">freq {freq}</label>
</main>
