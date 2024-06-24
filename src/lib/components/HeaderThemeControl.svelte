<script lang="ts">
  import themes from '../../../themes';
  import { handleMenuOutsideClick } from './menu-outside-click-handler';

  export let selectedTheme: string;

  let ref: HTMLDetailsElement;

  const selectTheme = (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => {
    selectedTheme = e.currentTarget.dataset.setTheme || 'dim';

    document.documentElement.setAttribute('data-theme', selectedTheme);
  };
</script>

<li>
  <details bind:this={ref}>
    <summary on:click|stopPropagation={handleMenuOutsideClick(ref, 'setTheme')}
      ><svg
        class="w-[24px] h-[24px]"
        aria-hidden="true"
        fill="none"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg></summary
    >
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
</li>
