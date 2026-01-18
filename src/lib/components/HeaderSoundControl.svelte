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
      <svg
        class="w-[28px] h-[28px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.5 8.43A4.985 4.985 0 0 1 17 12a4.984 4.984 0 0 1-1.43 3.5m2.794 2.864A8.972 8.972 0 0 0 21 12a8.972 8.972 0 0 0-2.636-6.364M12 6.135v11.73a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z"
        />
      </svg>
    {:else}
      <svg
        class="w-[28px] h-[28px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.5 8.43A4.985 4.985 0 0 1 17 12c0 1.126-.5 2.5-1.5 3.5m2.864-9.864A8.972 8.972 0 0 1 21 12c0 2.023-.5 4.5-2.5 6M7.8 7.5l2.56-2.133a1 1 0 0 1 1.64.768V12m0 4.5v1.365a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m1-4 14 14"
        />
      </svg>
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
