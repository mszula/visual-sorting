<script lang="ts">
  import { onMount } from 'svelte';
  import { trackEvent } from '../umami';

  // Bump this key when shipping a new batch of features to surface the modal
  // again to returning visitors.
  const VERSION_KEY = 'whats-new-2026-05';

  let ref: HTMLDialogElement;

  onMount(() => {
    if (localStorage.getItem(VERSION_KEY)) return;
    // Small delay so the rest of the UI is rendered first.
    setTimeout(() => {
      ref?.showModal();
      trackEvent('modal-shown', { modal: 'whats-new', version: VERSION_KEY });
    }, 800);
  });

  const dismiss = (action: 'gotIt' | 'backdrop') => {
    localStorage.setItem(VERSION_KEY, '1');
    trackEvent('modal-action-whats-new', { action });
    ref?.close();
  };
</script>

<dialog
  bind:this={ref}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => localStorage.setItem(VERSION_KEY, '1')}
>
  <div class="modal-box max-w-lg">
    <h3 class="text-lg font-bold mb-1">✨ What's new</h3>
    <p class="text-sm opacity-70 mb-4">
      A bunch of fresh features landed. Here's the highlights:
    </p>
    <ul class="space-y-3">
      <li>
        <div class="font-semibold">Compare two algorithms</div>
        <div class="text-sm opacity-70">
          Toggle the compare icon in the header to race two algorithms on the
          same array, side-by-side or stacked.
        </div>
      </li>
      <li>
        <div class="font-semibold">Live metrics</div>
        <div class="text-sm opacity-70">
          Comparisons, swaps and array accesses ticking in the header — see why
          non-comparison sorts skip <kbd class="kbd kbd-xs">Cmp</kbd> entirely.
        </div>
      </li>
      <li>
        <div class="font-semibold">Keyboard shortcuts</div>
        <div class="text-sm opacity-70">
          <kbd class="kbd kbd-xs">Space</kbd> start/stop,
          <kbd class="kbd kbd-xs">→</kbd> step,
          <kbd class="kbd kbd-xs">R</kbd> shuffle, plus speed and algorithm
          cycling. Press <kbd class="kbd kbd-xs">?</kbd> for the full list.
        </div>
      </li>
      <li>
        <div class="font-semibold">New array patterns</div>
        <div class="text-sm opacity-70">
          <strong>Wave</strong>, <strong>Nearly Sorted</strong> and
          <strong>Pipe Organ</strong> joined the pattern picker next to the
          shuffle button.
        </div>
      </li>
      <li>
        <div class="font-semibold">Your preferences stick</div>
        <div class="text-sm opacity-70">
          Size, delay, sound and selected pattern persist between visits.
        </div>
      </li>
    </ul>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary" on:click={() => dismiss('gotIt')}
          >Got it</button
        >
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button on:click={() => dismiss('backdrop')}>close</button>
  </form>
</dialog>
