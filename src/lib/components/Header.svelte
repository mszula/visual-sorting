<script lang="ts">
  import themes from '../../../themes';

  export let selectedTheme: string;

  const selectTheme = (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => {
    selectedTheme = e.currentTarget.dataset.setTheme || 'dim';

    document.documentElement.setAttribute('data-theme', selectedTheme);
  };
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost" href="/">
      <span class="text-lg md:text-xl"
        >Visual Sorting <span class="text-sm">aka The Sound Of Sorting</span
        ></span
      >
    </a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li>
        <details>
          <summary
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
    </ul>

    <a
      class="btn btn-square btn-ghost"
      href="https://github.com/mszula/visual-sorting"
      target="_blank"
    >
      <svg
        class="w-[24px] h-[24px]"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
          fill-rule="evenodd"
        />
      </svg>
    </a>
  </div>
</div>
