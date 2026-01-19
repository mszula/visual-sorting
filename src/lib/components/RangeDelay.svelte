<script lang="ts">
  import { trackEvent } from '../umami';

  export let realDelay: number;
  let delay: number = 20;

  const delayFactors: { max: number; factor: number; precise?: boolean }[] = [
    { max: 20, factor: 1 / 10, precise: true },
    { max: 30, factor: 1 / 5 },
    { max: 40, factor: 1 / 4 },
    { max: 50, factor: 1 / 3 },
    { max: 60, factor: 1 / 2 },
    { max: 70, factor: 1 },
    { max: 80, factor: 1.5 },
    { max: 90, factor: 3 },
    { max: Infinity, factor: 5 },
  ];

  const getRealDelay = (delay: number) => {
    for (const { max, factor, precise } of delayFactors) {
      if (delay <= max) {
        return precise
          ? Math.round(delay * factor * 10) / 10
          : Math.round(delay * factor);
      }
    }

    return delay;
  };

  $: realDelay = getRealDelay(delay);
</script>

<label class="form-control w-full">
  <div class="label">
    <span class="label-text">Delay</span>
    <span class="label-text-alt">{realDelay} ms</span>
  </div>
  <input
    id="delay"
    name="delay"
    class="range range-sm"
    max="100"
    min="0"
    step="0.1"
    type="range"
    bind:value={delay}
  />
</label>
