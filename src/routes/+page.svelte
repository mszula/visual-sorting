<script lang="ts">
  import '../app.css';
  import {
    applyPattern,
    type Pattern,
  } from '../lib/randomized-array-generator';
  import { emptyStats, type SortStats } from '../lib/types';
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
  import SortPanel from '../lib/components/SortPanel.svelte';
  import type { AlgorithmDefinition } from '../lib/sort-algorithms/types';
  import { arrayToSort, running, pattern } from '../states';
  import { soundStart, soundStop, type OscillatorType } from '../lib/sound';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { loadPref, savePref } from '../lib/persistence';
  import MobileAlgorithmSelector from '$lib/components/mobile/MobileAlgorithmSelector.svelte';
  import LeaveAStarModal from '$lib/components/LeaveAStarModal.svelte';
  import KoFiSupportModal from '$lib/components/KoFiSupportModal.svelte';
  import HelpDialog from '$lib/components/HelpDialog.svelte';
  import WhatsNewModal from '$lib/components/WhatsNewModal.svelte';
  import { algorithms } from '$lib/sort-algorithms/algorithms';

  let selectedTheme: Theme = 'dim';
  let size = loadPref('size', 300);
  let delay = 2;
  let delaySlider = loadPref('delay', 20);
  let intervalRef: number;
  let algorithmA: AlgorithmDefinition = algorithms[0][0];
  let algorithmB: AlgorithmDefinition = algorithms[0][1] ?? algorithms[0][0];
  let compareMode = false;
  let compareLayout: 'row' | 'col' = loadPref('compareLayout', 'row');
  let oscillatorType: OscillatorType = loadPref<OscillatorType>(
    'oscillatorType',
    'triangle'
  );
  let lastOscillator: NonNullable<OscillatorType> = oscillatorType ?? 'triangle';
  $: if (oscillatorType) lastOscillator = oscillatorType;

  // Algorithm-specific size component (e.g., Bitonic Sort needs powers of two).
  // Picks from whichever active algorithm requires a custom picker.
  $: arraySizeComponent =
    algorithmA?.arraySizeComponent ?? algorithmB?.arraySizeComponent;

  let helpDialog: HelpDialog | undefined;
  const flatAlgorithms = algorithms.flat();

  let panelA: SortPanel | undefined;
  let panelB: SortPanel | undefined;
  let statsA: SortStats = emptyStats();
  let statsB: SortStats = emptyStats();
  let doneA = false;
  let doneB = false;
  // True between sort completion and the start of the next run.
  // Keeps the final tally on screen while preventing the next run
  // from accumulating on top of it.
  let runCompleted = false;
  let prevRunning = false;

  const beginNewRunIfNeeded = () => {
    if (runCompleted) {
      // restart() re-arms the generator on the CURRENT working array (already
      // sorted from the previous run) instead of copying baseArray back.
      // Otherwise a Start click after completion would silently re-shuffle and
      // re-sort instead of running on the visible state.
      panelA?.restart();
      if (compareMode) panelB?.restart();
      runCompleted = false;
    }
  };

  // Watch start transitions to clear stats from the previous completed run.
  $: {
    if ($running && !prevRunning) beginNewRunIfNeeded();
    prevRunning = $running;
  }

  $: if (browser) savePref('size', size);
  $: if (browser) savePref('oscillatorType', oscillatorType);
  $: if (browser) savePref('delay', delaySlider);
  $: if (browser) savePref('compareLayout', compareLayout);

  const cycleAlgorithm = (dir: 1 | -1) => {
    const idx = flatAlgorithms.findIndex((a) => a.name === algorithmA?.name);
    const len = flatAlgorithms.length;
    const next = flatAlgorithms[(idx + dir + len) % len];
    selectAlgorithm(next, 'A');
  };

  const pickDefaultB = (excludeName?: string): AlgorithmDefinition => {
    return (
      flatAlgorithms.find((a) => a.name !== excludeName) ?? flatAlgorithms[0]
    );
  };

  const toggleCompareMode = () => {
    if (!compareMode) {
      if (!algorithmB) algorithmB = pickDefaultB(algorithmA?.name);
      compareMode = true;
    } else {
      compareMode = false;
    }
    $running = false;
    runCompleted = false;
    updateCompareUrl();
  };

  const toggleCompareLayout = () => {
    compareLayout = compareLayout === 'row' ? 'col' : 'row';
  };

  const updateCompareUrl = () => {
    if (!browser) return;
    const url = new URL(window.location.href);
    if (compareMode && algorithmB) {
      url.searchParams.set(
        'compare',
        algorithmB.name.toLowerCase().replace(/ /g, '-')
      );
    } else {
      url.searchParams.delete('compare');
    }
    goto(url, { keepFocus: true, noScroll: true, replaceState: true });
  };

  const toggleMute = () => {
    oscillatorType = oscillatorType ? null : lastOscillator;
  };

  const openHelp = () => helpDialog?.open();

  let wrapperEl: HTMLDivElement | undefined;
  let barsContainer: HTMLDivElement | undefined;
  let wrapperObserver: ResizeObserver | undefined;

  // Bars container needs a definite pixel height so svelte-canvas (whose
  // wrapper is height: 100%) can resolve it. Measure from the wrapper's flex
  // allocation, which is stable now that pickers live in the controls row
  // instead of above the bars.
  const syncBarsHeight = () => {
    if (!barsContainer || !wrapperEl) return;
    const target = Math.max(wrapperEl.clientHeight, 320 /* min-h-80 floor */);
    barsContainer.style.height = `${target}px`;
  };

  onMount(() => {
    themeChange(false);
    selectedTheme =
      (document.documentElement.dataset.theme as Theme) || selectedTheme;
    syncBarsHeight();
    window.addEventListener('resize', syncBarsHeight);
    if (wrapperEl) {
      wrapperObserver = new ResizeObserver(syncBarsHeight);
      wrapperObserver.observe(wrapperEl);
    }

    const url = new URL(window.location.toString());
    const aSlug = url.searchParams.get('algorithm');
    const bSlug = url.searchParams.get('compare');

    const findBySlug = (slug: string | null) =>
      slug
        ? flatAlgorithms.find(
            (a) => a.name.toLowerCase().replace(/ /g, '-') === slug
          )
        : undefined;

    const initialA = findBySlug(aSlug) ?? flatAlgorithms[0];
    selectAlgorithm(initialA, 'A', false);

    const initialB = findBySlug(bSlug);
    if (initialB) {
      algorithmB = initialB;
      compareMode = true;
    }

    return () => {
      window.removeEventListener('resize', syncBarsHeight);
      wrapperObserver?.disconnect();
    };
  });

  $: theme = daisyuiColors[selectedTheme] || daisyuiColors.dim;

  let lastSizeApplied = -1;
  $: if (size !== lastSizeApplied) {
    lastSizeApplied = size;
    regenerate();
  }

  const regenerate = () => {
    $arrayToSort = applyPattern(size, $pattern);
    reset();
  };

  const setPattern = (p: Pattern) => {
    $pattern = p;
    regenerate();
  };
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
            // Only panel A plays sound — two simultaneous oscillators would
            // collide on the single shared AudioContext.
            const aDone = panelA?.tick(true) ?? true;
            const bDone = compareMode ? (panelB?.tick(false) ?? true) : true;
            if (aDone && bDone) {
              window.clearInterval(intervalRef);
              $running = false;
              runCompleted = true;
              break;
            }
          }
        }, delay);
      }
    }
  }

  const reset = () => {
    $running = false;
    runCompleted = false;
    // Panels re-initialize themselves reactively when baseArray/algorithm changes.
  };

  const step = async () => {
    if ($running) {
      $running = false;
      await tick();
    }
    beginNewRunIfNeeded();

    if (oscillatorType) soundStart(size, oscillatorType);
    const aDone = panelA?.tick(true) ?? true;
    const bDone = compareMode ? (panelB?.tick(false) ?? true) : true;
    if (aDone && bDone) runCompleted = true;
    setTimeout(soundStop, 100);
  };

  const selectAlgorithm = (
    algo: AlgorithmDefinition,
    slot: 'A' | 'B' = 'A',
    setSearchParams = true
  ) => {
    if (slot === 'A') {
      algorithmA = algo;
    } else {
      algorithmB = algo;
    }
    $running = false;
    runCompleted = false;

    if (setSearchParams && browser) {
      const url = new URL(window.location.href);
      const slug = algo.name.toLowerCase().replace(/ /g, '-');
      if (slot === 'A') {
        url.searchParams.set('algorithm', slug);
      } else {
        url.searchParams.set('compare', slug);
      }
      goto(url, { keepFocus: true, noScroll: true });
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    // Skip when typing in form fields so users can interact with sliders etc.
    const t = e.target as HTMLElement | null;
    if (
      t &&
      (t.tagName === 'INPUT' ||
        t.tagName === 'TEXTAREA' ||
        t.tagName === 'SELECT' ||
        t.isContentEditable)
    ) {
      return;
    }
    // Don't hijack browser shortcuts (Cmd+R reload, Ctrl+Space input switch, etc.)
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        $running = !$running;
        break;
      case 'ArrowRight':
        e.preventDefault();
        step();
        break;
      case 'ArrowUp':
        e.preventDefault();
        delaySlider = Math.max(0, delaySlider - 5);
        break;
      case 'ArrowDown':
        e.preventDefault();
        delaySlider = Math.min(100, delaySlider + 5);
        break;
      case '[':
        e.preventDefault();
        cycleAlgorithm(-1);
        break;
      case ']':
        e.preventDefault();
        cycleAlgorithm(1);
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        setPattern('shuffle');
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        toggleMute();
        break;
      case '?':
        e.preventDefault();
        openHelp();
        break;
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <div class="flex flex-col h-screen">
    <div class="flex">
      <Header
        bind:selectedTheme
        bind:oscillatorType
        {openHelp}
        {compareMode}
        {toggleCompareMode}
        panels={compareMode
          ? [
              { stats: statsA, label: algorithmA?.name },
              { stats: statsB, label: algorithmB?.name },
            ]
          : [{ stats: statsA }]}
      />
    </div>
    <div
      bind:this={wrapperEl}
      class="flex-1 flex flex-col min-h-0 overflow-hidden m-2 md:m-5"
    >
      <div
        bind:this={barsContainer}
        class="flex flex-grow min-h-80 relative {compareMode &&
        compareLayout === 'row'
          ? 'flex-col lg:flex-row'
          : 'flex-col'} gap-2"
      >
        <SortPanel
          bind:this={panelA}
          algorithm={algorithmA}
          baseArray={$arrayToSort}
          {theme}
          {oscillatorType}
          bind:stats={statsA}
          bind:isDone={doneA}
        />
        {#if compareMode}
          <SortPanel
            bind:this={panelB}
            algorithm={algorithmB}
            baseArray={$arrayToSort}
            {theme}
            oscillatorType={null}
            bind:stats={statsB}
            bind:isDone={doneB}
          />
          <button
            class="btn btn-sm btn-ghost absolute top-2 right-2 z-10 gap-1.5"
            aria-label="Toggle compare layout"
            title="Switch layout (side-by-side / stacked)"
            on:click={toggleCompareLayout}
          >
            {#if compareLayout === 'row'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="20" height="9" x="2" y="3" rx="1" />
                <rect width="20" height="9" x="2" y="14" rx="1" />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="9" height="20" x="3" y="2" rx="1" />
                <rect width="9" height="20" x="14" y="2" rx="1" />
              </svg>
            {/if}
          </button>
        {/if}
      </div>
    </div>
    <div class="flex mx-2 mb-2 md:mx-5 md:mb-5">
      <div class="flex flex-wrap w-full flex-col md:flex-row">
        {#if compareMode}
          <!-- Desktop: 2 compact selects centered in a slim card matching controls' visual -->
          <div
            class="hidden md:flex md:flex-col md:justify-center md:gap-4 md:mr-5 md:w-[30.5rem] card bg-base-300 rounded-box p-3"
          >
            <MobileAlgorithmSelector
              selectAlgorithm={(a) => selectAlgorithm(a, 'A')}
              selectedAlgorithm={algorithmA}
            />
            <MobileAlgorithmSelector
              selectAlgorithm={(a) => selectAlgorithm(a, 'B')}
              selectedAlgorithm={algorithmB}
            />
          </div>
          <!-- Mobile: 2 selects side-by-side -->
          <div class="md:hidden flex flex-row gap-2 mb-2">
            <div class="flex-1 min-w-0">
              <MobileAlgorithmSelector
                selectAlgorithm={(a) => selectAlgorithm(a, 'A')}
                selectedAlgorithm={algorithmA}
              />
            </div>
            <div class="flex-1 min-w-0">
              <MobileAlgorithmSelector
                selectAlgorithm={(a) => selectAlgorithm(a, 'B')}
                selectedAlgorithm={algorithmB}
              />
            </div>
          </div>
        {:else}
          <div class="hidden md:flex">
            <AlgorithmSelector
              selectAlgorithm={(a) => selectAlgorithm(a, 'A')}
              selectedAlgorithm={algorithmA}
            />
          </div>
          <div class="md:hidden">
            <MobileAlgorithmSelector
              selectAlgorithm={(a) => selectAlgorithm(a, 'A')}
              selectedAlgorithm={algorithmA}
            />
          </div>
        {/if}
        <div
          class="flex flex-row flex-grow card bg-base-300 rounded-box place-items-center p-3 md:p-5 lg:mb-2"
        >
          <div
            class="flex flex-col w-full justify-between items-center lg:flex-row"
          >
            <div class="flex lg:mr-5 flex-col items-center w-full lg:w-auto">
              <ControlButtons {setPattern} {step} />
            </div>
            <div class="flex grow flex-col w-full lg:w-auto">
              {#if arraySizeComponent}
                <svelte:component this={arraySizeComponent} bind:size />
              {:else}
                <RangeArraySize bind:size />
              {/if}
              <RangeDelay bind:realDelay={delay} bind:delay={delaySlider} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <LeaveAStarModal />
  <KoFiSupportModal />
  <HelpDialog bind:this={helpDialog} />
  <WhatsNewModal />
</main>
