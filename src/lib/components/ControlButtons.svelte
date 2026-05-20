<script lang="ts">
  export let step: () => void;
  export let setPattern: (p: Pattern) => void;

  import { running } from '../../states';
  import type { Pattern } from '../randomized-array-generator';
  import { trackEvent } from '../umami';
  import { handleMenuOutsideClick } from './menu-outside-click-handler';
  import { loadPref, savePref } from '../persistence';
  import { browser } from '$app/environment';

  type SelectedPattern = Exclude<Pattern, 'shuffle'>;

  const patternLabels: Record<Pattern, string> = {
    shuffle: 'Shuffle',
    reverse: 'Reverse',
    valley: 'Valley',
    mountain: 'Mountain',
    'nearly-sorted': 'Nearly Sorted',
    sine: 'Wave',
    'pipe-organ': 'Pipe Organ',
  };

  const dropdownPatterns: SelectedPattern[] = [
    'reverse',
    'valley',
    'mountain',
    'pipe-organ',
    'nearly-sorted',
    'sine',
  ];

  const newPatterns = new Set<SelectedPattern>([
    'pipe-organ',
    'nearly-sorted',
    'sine',
  ]);

  let selectedPattern: SelectedPattern = loadPref<SelectedPattern>(
    'selectedPattern',
    'reverse'
  );
  $: if (browser) savePref('selectedPattern', selectedPattern);

  let patternRef: HTMLDetailsElement;

  const start = () => {
    $running = !$running;
  };

  const pick = (p: SelectedPattern) => () => {
    selectedPattern = p;
    setPattern(p);
    trackEvent('array-pattern', { pattern: p });
    patternRef?.removeAttribute('open');
  };

  const shuffleClick = () => {
    setPattern('shuffle');
    trackEvent('array-pattern', { pattern: 'shuffle' });
  };

  const reapply = () => {
    setPattern(selectedPattern);
    trackEvent('array-pattern', { pattern: selectedPattern });
  };
</script>

<div class="mb-2 lg:mb-4">
  <div class="join">
    <button
      class="btn join-item {$running
        ? 'btn-secondary'
        : 'btn-primary'} lg:btn-lg lg:w-24"
      title={$running ? 'Stop (Space)' : 'Start (Space)'}
      on:click={start}>{$running ? 'Stop' : 'Start'}</button
    >
    <button
      class="btn join-item lg:btn-lg lg:w-24"
      title="Step (→)"
      on:click={step}>Step</button
    >
  </div>
  <button class="btn lg:btn-lg" title="Shuffle (R)" on:click={shuffleClick}
    >Shuffle</button
  >
</div>
<div class="flex gap-1">
  <button class="btn flex-grow" on:click={reapply}
    >↻ {patternLabels[selectedPattern]}</button
  >
  <details
    class="dropdown dropdown-top dropdown-end"
    bind:this={patternRef}
  >
    <summary
      class="btn"
      on:click|stopPropagation={handleMenuOutsideClick(
        patternRef,
        'patternSelect'
      )}>▾</summary
    >
    <ul
      class="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow"
    >
      {#each dropdownPatterns as p}
        <li>
          <button
            class={p === selectedPattern ? 'btn-active' : ''}
            data-pattern-select
            on:click={pick(p)}
          >
            <span class="flex items-center gap-2">
              {patternLabels[p]}
              {#if newPatterns.has(p)}
                <span class="badge badge-primary badge-sm">new</span>
              {/if}
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </details>
</div>
