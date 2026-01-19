<script lang="ts">
  import themes from '../../themes.js';
  import { handleMenuOutsideClick } from './menu-outside-click-handler';
  import { trackEvent } from '../umami';

  export let selectedTheme: string;

  let ref: HTMLDetailsElement;

  const selectTheme = (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => {
    selectedTheme = e.currentTarget.dataset.setTheme || 'dim';

    document.documentElement.setAttribute('data-theme', selectedTheme);
    trackEvent('theme-changed', { theme: selectedTheme });
  };
</script>

<details bind:this={ref}>
  <summary on:click|stopPropagation={handleMenuOutsideClick(ref, 'setTheme')}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-[24px] h-[24px]"
      ><path
        d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
      /><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle
        cx="17.5"
        cy="10.5"
        r=".5"
        fill="currentColor"
      /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><circle
        cx="8.5"
        cy="7.5"
        r=".5"
        fill="currentColor"
      /></svg
    >
    <span class="md:hidden"
      >{selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}</span
    >
  </summary>
  <ul class="p-2 bg-base-100 rounded-t-none z-10">
    {#each themes as theme}
      <li>
        <button
          data-act-class="btn-active"
          data-set-theme={theme}
          on:click={selectTheme}
          >{theme.charAt(0).toUpperCase() + theme.slice(1)}</button
        >
      </li>
    {/each}
  </ul>
</details>
