<script lang="ts">
  import { Oscillator } from "tone";
  import Bars from "./lib/Bars.svelte";
  import { generateArray, shuffle } from "./lib/randomized-array-generator";
  import { bubleSort } from "./lib/sort-algorithms/buble-sort";
  import type { SortElement } from "./lib/types";

  let size = 10;
  let running = false;
  let delay = 1;
  let freq = 0;
  let osc: Oscillator = new Oscillator().toDestination();

  $: bars = shuffle(generateArray(size));

  const updateBars = (b: SortElement[]) => (bars = [...b]);

  $: osc.frequency.value = freq;
  let intervalRef: number;
  let g: Generator<SortElement[], SortElement[]>;
  $: {
    clearInterval(intervalRef);
    if (running) {
      intervalRef = setInterval(() => {
        const skips = delay < 1 ? (1 - delay) * 100 : 1;
        for (let i = 0; i < skips; i++) {
          const next = g.next();
          if (next.done) {
            clearInterval(intervalRef);
            running = false;
            break;
          }
          updateBars(next.value);
        }
      }, delay);
    }
  }

  const click = async () => {
    osc.type = "square"; // rodzaj oscylatora
    osc.frequency.value = freq;
    osc.start();

    if (!g) {
      g = bubleSort(bars);
    }
    running = true;
    // const intervalRef = setInterval(() => {
    //   for (let i = 0; i < 100; i++) {
    //     const next = g.next();
    //     if (next.done) {
    //       clearInterval(intervalRef);
    //       break;
    //     }
    //     updateBars(next.value);
    //   }
    // }, 1000);
    // stopped = true;
  };

  const step = async () => {
    if (!g) {
      g = bubleSort(bars);
    }
    const next = g.next();
    if (next.value) {
      updateBars(next.value);
    }
  };
</script>

<main>
  <Bars height={500} {bars} {osc} />
  <button on:click={click}>Sort</button>
  <button on:click={() => (running = false)}>Stop</button>
  <button on:click={step}>Step</button>
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
    max="20"
    step="0.1"
    bind:value={delay}
  />
  <label for="delay">Delay {delay}</label>
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
