<script lang="ts">
  import { customOscillatorTypes } from 'web-audio-oscillators';
  import { type OscillatorType } from '../sound';
  import { handleMenuOutsideClick } from './menu-outside-click-handler';
  import { trackEvent } from '../umami';

  export let oscillatorType: OscillatorType;

  const getOscillatorName = (osc: OscillatorType) => {
    if (!osc) {
      return 'None';
    }
    return (osc.charAt(0).toUpperCase() + osc.slice(1)).replace(
      /([0-9])/g,
      ' $1'
    );
  };

  const changeSound = (type: OscillatorType) => {
    oscillatorType = type;
    trackEvent('sound-changed', { type: type || 'none' });
  };

  let ref: HTMLDetailsElement;
</script>

<details bind:this={ref}>
  <summary
    class="w-full md:w-40"
    on:click|stopPropagation={handleMenuOutsideClick(ref, 'soundSelect')}
  >
    {#if oscillatorType}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[28px] h-[28px]"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[28px] h-[28px]"><path d="M16 9a5 5 0 0 1 .95 2.293"/><path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/><path d="m2 2 20 20"/><path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/><path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/></svg>
    {/if}
    {oscillatorType ? getOscillatorName(oscillatorType) : 'None'}
  </summary>
  <ul class="p-2 bg-base-100 rounded-t-none z-10">
    <li>
      <button
        class={!oscillatorType ? 'btn-active' : ''}
        data-sound-select
        on:click={() => changeSound(null)}>None</button
      >
    </li>
    {#each customOscillatorTypes as osc}
      <li>
        <button
          class={osc === oscillatorType ? 'btn-active' : ''}
          data-sound-select
          on:click={() => changeSound(osc)}>{getOscillatorName(osc)}</button
        >
      </li>
    {/each}
  </ul>
</details>
