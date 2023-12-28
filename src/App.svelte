<script lang="ts">
  import "./app.css";
  import { Oscillator } from "tone";
  import { generateArray, shuffle } from "./lib/randomized-array-generator";
  import { bubleSort } from "./lib/sort-algorithms/buble-sort";
  import type { ProgressIndicator, SortElement } from "./lib/types";
  import Header from "./lib/components/Header.svelte";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import daisyuiColors from "daisyui/src/theming/themes";
  import type { Theme } from "daisyui";
  import { quickSort } from "./lib/sort-algorithms/quick-sort";
  import AlgorithmSelector from "./lib/components/AlgorithmSelector.svelte";
  import ControlButtons from "./lib/components/ControlButtons.svelte";
  import RangeArraySize from "./lib/components/RangeArraySize.svelte";
  import RangeDelay from "./lib/components/RangeDelay.svelte";
  import Footer from "./lib/components/Footer.svelte";
  import { getOscilator } from "./lib/sound";
  import BarsRender from "./lib/components/BarsRender.svelte";

  let selectedTheme = "light";
  onMount(() => {
    themeChange(false);
    selectedTheme = document.documentElement.dataset.theme || "light";
  });

  let size = 300;
  let running = false;
  let delay = 2;
  let arrayToSort: number[];
  let bars: SortElement[];

  $: {
    arrayToSort = shuffle(generateArray(size));
    reset();
  }

  const updateBars = (b: number[], p: ProgressIndicator) =>
    (bars = [...b].map((v, i) => ({
      value: v,
      accesing: p.accesing.includes(i),
      processing: p.processing.includes(i),
      makeSound: false,
    })));

  $: theme = daisyuiColors[selectedTheme as Theme];

  let intervalRef: number;
  let sortGenerator: Generator<ProgressIndicator, void, unknown> | null;
  $: {
    window.clearInterval(intervalRef);
    if (running) {
      intervalRef = window.setInterval(() => {
        if (sortGenerator) {
          // Magic calculation which calculate how many steps function should do for each tick
          const steps = delay < 2 ? 100 - ((delay * 10 - 1) * 98) / 18 : 1;
          for (let i = 0; i < steps; i++) {
            const next = sortGenerator.next();
            if (next.done) {
              clearInterval(intervalRef);
              reset();
              break;
            }
            updateBars(arrayToSort, next.value);
          }
        }
      }, delay);
    }
  }

  const reset = () => {
    updateBars(arrayToSort, { accesing: [], processing: [] });
    sortGenerator = null;
    running = false;
  };

  const start = () => {
    if (running) {
      running = false;
      return;
    }

    if (!sortGenerator) {
      sortGenerator = quickSort(arrayToSort);
    }
    running = true;
  };

  const step = () => {
    if (running) {
      running = false;
    }

    if (!sortGenerator) {
      sortGenerator = quickSort(arrayToSort);
    }
    const next = sortGenerator.next();
    if (!next.done) {
      updateBars(arrayToSort, next.value);
    }
  };
</script>

<main>
  <div class="flex flex-col min-h-screen">
    <div class="flex">
      <Header bind:selectedTheme />
    </div>
    <div class="flex-1 flex flex-col m-5">
      <div style="width: 100%; height: 500px">
        <BarsRender {bars} osc={getOscilator()} {theme} />
      </div>
    </div>
    <div class="flex m-5">
      <div class="flex w-full">
        <AlgorithmSelector />
        <div
          class="grid flex-row flex-grow card bg-base-300 rounded-box place-items-center p-5"
        >
          <div class="flex w-full justify-between items-center">
            <div class="flex mr-5 flex-col items-center">
              <ControlButtons {running} {start} {step} />
            </div>
            <div class="flex grow flex-col">
              <RangeArraySize {running} bind:size />
              <RangeDelay bind:delay />
            </div>
          </div>
        </div>
        <div class="divider divider-horizontal">OR</div>
        <div
          class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
        >
          content
        </div>
        <div class="flex-1 w-32">03</div>
      </div>
    </div>
    <Footer />
  </div>
</main>
