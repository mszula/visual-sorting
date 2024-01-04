<script lang="ts">
  import "./app.css";
  import { generateArray, shuffle } from "./lib/randomized-array-generator";
  import type { ProgressIndicator, SortElement } from "./lib/types";
  import Header from "./lib/components/Header.svelte";
  import { onMount, tick } from "svelte";
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

  let selectedTheme = "dim";
  let size = 300;
  let delay = 2;
  let sound = true;
  let bars: SortElement[];
  let intervalRef: number;
  let algorithm: AlgorithmDefinition & { instance: SortingGenerator };

  onMount(() => {
    themeChange(false);
    selectedTheme = document.documentElement.dataset.theme || selectedTheme;
    const barsContainer = document.getElementById("bars-container");
    if (barsContainer) {
      barsContainer.style.height = `${barsContainer.offsetHeight}px`;
    }
  });

  $: theme = daisyuiColors[selectedTheme as Theme];
  $: {
    $arrayToSort = shuffle(generateArray(size));
    reset();
  }
  $: {
    $running && sound ? soundStart(size) : soundStop();
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
      makeSound: p?.sound === i,
    }));
  };

  const reset = () => {
    updateBars($arrayToSort, { accesing: [] });
    $running = false;
    if (algorithm) {
      algorithm.instance = algorithm.function($arrayToSort);
    }
  };

  const step = async () => {
    if ($running) {
      $running = false;
      await tick();
    }

    const next = algorithm.instance.next();
    if (!next.done) {
      sound && soundStart(size);
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
    <div class="flex-1 flex flex-col m-2 md:m-5">
      <div class="flex flex-grow min-h-80" id="bars-container">
        <BarsRender {bars} {theme} />
      </div>
    </div>
    <div class="flex mx-2 mb-2 md:mx-5 md:mb-5">
      <div class="flex flex-wrap w-full flex-col md:flex-row">
        <AlgorithmSelector {selectAlgorithm} />
        <div
          class="grid flex-row flex-grow card bg-base-300 rounded-box place-items-center p-5 mb-2 md:mb-0"
        >
          <div class="flex w-full justify-between items-center">
            <div class="flex mr-5 flex-col items-center">
              <ControlButtons {step} {reset} {size} />
            </div>
            <div class="flex grow flex-col">
              {#if algorithm?.arraySizeComponent}
                <svelte:component
                  this={algorithm.arraySizeComponent}
                  bind:size
                />
              {:else}
                <RangeArraySize bind:size />
              {/if}
              <RangeDelay bind:delay />
            </div>
          </div>
        </div>
        <div class="hidden md:divider md:divider-horizontal"></div>
        <div
          class="grid card bg-base-300 rounded-box place-items-center flex-grow max-w-80"
        >
          <div class="form-control w-32">
            <label class="label cursor-pointer">
              <span class="label-text">Sound</span>
              <input type="checkbox" class="toggle" bind:checked={sound} />
            </label>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</main>
