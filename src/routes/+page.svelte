<script lang="ts">
  import '../app.css';
  import { generateArray, shuffle } from '../lib/randomized-array-generator';
  import type { ProgressIndicator, SortElement } from '../lib/types';
  import Header from '../lib/components/Header.svelte';
  import { onMount, tick } from 'svelte';
  import { themeChange } from 'theme-change';
  import daisyuiColors from 'daisyui/src/theming/themes';
  import type { Theme } from 'daisyui';
  import AlgorithmSelector from '../lib/components/AlgorithmSelector.svelte';
  import ControlButtons from '../lib/components/ControlButtons.svelte';
  import RangeArraySize from '../lib/components/RangeArraySize.svelte';
  import RangeDelay from '../lib/components/RangeDelay.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import BarsRender from '../lib/components/BarsRender.svelte';
  import type {
    AlgorithmDefinition,
    SortingGenerator,
  } from '../lib/sort-algorithms/types';
  import { arrayToSort, running } from '../states';
  import { soundStart, soundStop, playValue, type OscillatorType } from '../lib/sound';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import MobileAlgorithmSelector from '$lib/components/mobile/MobileAlgorithmSelector.svelte';
  import LeaveAStarModal from '$lib/components/LeaveAStarModal.svelte';
  import KoFiSupportModal from '$lib/components/KoFiSupportModal.svelte';
  import { algorithms } from '$lib/sort-algorithms/algorithms';

  let selectedTheme: Theme = 'dim';
  let size = 300;
  let delay = 2;
  let bars: SortElement[];
  let intervalRef: number;
  let algorithm: AlgorithmDefinition & { instance: SortingGenerator };
  let oscillatorType: OscillatorType = 'triangle';
  let barsContainer: HTMLDivElement | undefined;

  onMount(() => {
    themeChange(false);
    selectedTheme =
      (document.documentElement.dataset.theme as Theme) || selectedTheme;
    if (barsContainer) {
      barsContainer.style.height = `${barsContainer.offsetHeight}px`;
    }

    const selectedAlgorithm = new URL(
      window.location.toString()
    ).searchParams.get('algorithm');

    if (!selectedAlgorithm) {
      selectAlgorithm(algorithms[0][0], false);
    } else {
      const algo = algorithms
        .flat()
        .find(
          (a: AlgorithmDefinition) =>
            a.name.toLowerCase().replace(/ /g, '-') === selectedAlgorithm
        );

      if (algo) {
        selectAlgorithm(algo, false);
      }
    }
  });

  $: theme = daisyuiColors[selectedTheme] || daisyuiColors.dim;
  $: {
    $arrayToSort = shuffle(generateArray(size));
    reset();
  }
  $: {
    $running && oscillatorType ? soundStart(size, oscillatorType) : soundStop();
  }
  $: {
    if (browser) {
      window.clearInterval(intervalRef);
      if ($running) {
        intervalRef = window.setInterval(() => {
          // Magic calculation which calculate how many steps function should do for each tick
          const steps = delay < 2 ? 100 - ((delay * 10 - 1) * 98) / 18 : 1;
          for (let i = 0; i < steps; i++) {
            const next = algorithm.instance.next();

            if (next.done) {
              window.clearInterval(intervalRef);
              reset();

              break;
            }
            if (next.value) {
              updateBars($arrayToSort, next.value);
              if (next.value.sound !== undefined) {
                playValue($arrayToSort[next.value.sound]);
              }
            }
          }
        }, delay);
      }
    }
  }

  const updateBars = (b: number[], p: ProgressIndicator) => {
    bars = [...b].map((v, i) => ({
      value: v,
      access: p.access.includes(i),
    }));
  };

  const reset = () => {
    updateBars($arrayToSort, { access: [] });
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
      if (oscillatorType) {
        soundStart(size, oscillatorType);
      }
      if (next.value) {
        updateBars($arrayToSort, next.value);
        if (next.value.sound !== undefined) {
          playValue($arrayToSort[next.value.sound]);
        }
      }
      setTimeout(soundStop, 100);
    }
  };

  const selectAlgorithm = (
    algo: AlgorithmDefinition,
    setSearchParams = true
  ) => {
    reset();
    algorithm = { ...algo, instance: algo.function($arrayToSort) };

    if (setSearchParams) {
      const url = new URL(window.location.href);
      url.searchParams.set(
        'algorithm',
        algo.name.toLowerCase().replace(/ /g, '-')
      );
      goto(url, { keepFocus: true, noScroll: true });
    }
  };
</script>

<main>
  <div class="flex flex-col min-h-screen">
    <div class="flex">
      <Header bind:selectedTheme bind:oscillatorType />
    </div>
    <div class="flex-1 flex flex-col m-2 md:m-5">
      <div bind:this={barsContainer} class="flex flex-grow min-h-80">
        <BarsRender {bars} {theme} />
      </div>
    </div>
    <div class="flex mx-2 mb-2 md:mx-5 md:mb-5">
      <div class="flex flex-wrap w-full flex-col md:flex-row">
        <div class="hidden md:flex">
          <AlgorithmSelector {selectAlgorithm} selectedAlgorithm={algorithm} />
        </div>
        <div class="md:hidden">
          <MobileAlgorithmSelector
            {selectAlgorithm}
            selectedAlgorithm={algorithm}
          />
        </div>
        <div
          class="flex flex-row flex-grow card bg-base-300 rounded-box place-items-center p-5 lg:mb-2"
        >
          <div
            class="flex flex-col w-full justify-between items-center lg:flex-row"
          >
            <div class="flex lg:mr-5 flex-col items-center w-full lg:w-auto">
              <ControlButtons {reset} {size} {step} />
            </div>
            <div class="flex grow flex-col w-full lg:w-auto">
              {#if algorithm?.arraySizeComponent}
                <svelte:component
                  this={algorithm.arraySizeComponent}
                  bind:size
                />
              {:else}
                <RangeArraySize bind:size />
              {/if}
              <RangeDelay bind:realDelay={delay} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <LeaveAStarModal />
  <KoFiSupportModal />
</main>
