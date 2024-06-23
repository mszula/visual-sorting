<script lang="ts">
  import { customOscillatorTypes } from 'web-audio-oscillators';
  import { type OscillatorType } from '../sound';

  export let sound: boolean;
  export let oscillatorType: OscillatorType;

  const getOscillatorName = (osc: OscillatorType) => {
    return (osc.charAt(0).toUpperCase() + osc.slice(1)).replace(
      /([0-9])/g,
      ' $1'
    );
  };
</script>

<div class="form-control w-32">
  <label class="label cursor-pointer">
    <span class="label-text">Sound</span>
    <input class="toggle" type="checkbox" bind:checked={sound} />
  </label>
</div>
<div class="form-control w-32">
  <select
    class="select select-bordered w-full max-w-xs"
    bind:value={oscillatorType}
  >
    {#each customOscillatorTypes as osc}
      <option value={osc}>{getOscillatorName(osc)}</option>
    {/each}
  </select>
</div>
