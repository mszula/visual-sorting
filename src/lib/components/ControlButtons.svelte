<script lang="ts">
  export let step: () => void;
  export let setPattern: (p: Pattern) => void;

  import { running } from '../../states';
  import type { Pattern } from '../randomized-array-generator';
  import { trackEvent } from '../umami';

  const start = () => {
    $running = !$running;
  };

  const applyPattern = (p: Pattern) => () => {
    setPattern(p);
    trackEvent('array-pattern', { pattern: p });
  };
</script>

<div class="mb-2 lg:mb-4">
  <div class="join">
    <button
      class="btn join-item {$running
        ? 'btn-secondary'
        : 'btn-primary'} lg:btn-lg lg:w-24"
      on:click={start}>{$running ? 'Stop' : 'Start'}</button
    >
    <button class="btn join-item lg:btn-lg lg:w-24" on:click={step}>Step</button
    >
  </div>
  <button class="btn lg:btn-lg" on:click={applyPattern('shuffle')}
    >Shuffle</button
  >
</div>
<div>
  <button class="btn" on:click={applyPattern('reverse')}>Reverse</button>
  <button class="btn" on:click={applyPattern('valley')}>Valley</button>
  <button class="btn" on:click={applyPattern('mountain')}>Mountain</button>
</div>
