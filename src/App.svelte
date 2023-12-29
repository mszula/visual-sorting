<script lang="ts">
  import "./app.css";
  import { generateArray, shuffle } from "./lib/randomized-array-generator";
  import type { ProgressIndicator, SortElement } from "./lib/types";
  import Header from "./lib/components/Header.svelte";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import daisyuiColors from "daisyui/src/theming/themes";
  import type { Theme } from "daisyui";
  import AlgorithmSelector from "./lib/components/AlgorithmSelector.svelte";
  import ControlButtons from "./lib/components/ControlButtons.svelte";
  import RangeArraySize from "./lib/components/RangeArraySize.svelte";
  import RangeDelay from "./lib/components/RangeDelay.svelte";
  import Footer from "./lib/components/Footer.svelte";
  import BarsRender from "./lib/components/BarsRender.svelte";
  import type {
    AlgorithmDefinition,
    SortingGenerator,
  } from "./lib/sort-algorithms/types";
  import { arrayToSort, running } from "./states";
  import { soundStart, soundStop } from "./lib/sound";

  let selectedTheme = "light";
  let size = 300;
  let delay = 2;
  let bars: SortElement[];
  let intervalRef: number;
  let algorithm: AlgorithmDefinition & { instance: SortingGenerator };

  onMount(() => {
    themeChange(false);
    selectedTheme = document.documentElement.dataset.theme || "light";
  });

  $: theme = daisyuiColors[selectedTheme as Theme];
  $: {
    $arrayToSort = shuffle(generateArray(size));
    reset();
  }
  $: {
    window.clearInterval(intervalRef);
    if ($running) {
      intervalRef = window.setInterval(() => {
        // Magic calculation which calculate how many steps function should do for each tick
        const steps = delay < 2 ? 100 - ((delay * 10 - 1) * 98) / 18 : 1;
        for (let i = 0; i < steps; i++) {
          const next = algorithm.instance.next();
          if (next.done) {
            clearInterval(intervalRef);
            reset();

            break;
          }
          updateBars($arrayToSort, next.value);
        }
      }, delay);
    }
  }

  const updateBars = (b: number[], p: ProgressIndicator) => {
    bars = [...b].map((v, i) => ({
      value: v,
      accesing: p.accesing.includes(i),
      processing: p.processing.includes(i),
      makeSound: false,
    }));
  };

  const reset = () => {
    updateBars($arrayToSort, { accesing: [], processing: [] });
    $running = false;
    if (algorithm) {
      algorithm.instance = algorithm.function($arrayToSort);
    }
    soundStop();
  };

  const step = () => {
    if ($running) {
      $running = false;
      soundStop();
    }

    const next = algorithm.instance.next();
    if (!next.done) {
      soundStart(size);
      updateBars($arrayToSort, next.value);
      soundStop("+0.1");
    }
  };

  const selectAlgorithm = (algo: AlgorithmDefinition) => {
    reset();
    algorithm = { ...algo, instance: algo.function($arrayToSort) };
  };
</script>

<main>
  <div class="flex flex-col min-h-screen">
    <div class="flex">
      <Header bind:selectedTheme />
    </div>
    <div class="flex-1 flex flex-col m-5">
      <div style="width: 100%; height: 500px">
        <BarsRender {bars} {theme} />
      </div>
    </div>
    <div class="flex m-5">
      <div class="flex w-full">
        <AlgorithmSelector {selectAlgorithm} />
        <div
          class="grid flex-row flex-grow card bg-base-300 rounded-box place-items-center p-5"
        >
          <div class="flex w-full justify-between items-center">
            <div class="flex mr-5 flex-col items-center">
              <ControlButtons {step} {reset} {size} />
            </div>
            <div class="flex grow flex-col">
              <RangeArraySize bind:size />
              <RangeDelay bind:delay />
            </div>
          </div>
        </div>
        <div class="divider divider-horizontal"></div>
        <div
          class="grid flex-grow card bg-base-300 rounded-box place-items-center"
        >
          <div class="form-control w-52">
            <label class="label cursor-pointer">
              <span class="label-text">Sound</span>
              <input type="checkbox" class="toggle" checked />
            </label>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</main>
