<script lang="ts">
  import HeaderSoundControl from '../HeaderSoundControl.svelte';
  import { type OscillatorType } from '../../sound';
  import HeaderThemeControl from '../HeaderThemeControl.svelte';
  import HeaderGitHubButton from '../HeaderGitHubButton.svelte';

  export let selectedTheme: string;
  export let oscillatorType: OscillatorType;

  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
</script>

<div class="flex-none md:hidden">
  <button class="btn btn-ghost" on:click={toggleMenu}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-6 h-6 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </button>
</div>

{#if isMenuOpen}
  <div
    class="z-10 absolute top-full left-0 right-0 bg-base-100 shadow-md md:hidden"
  >
    <ul class="menu p-2 items-center w-full">
      <li class="w-full"><HeaderSoundControl bind:oscillatorType /></li>
      <li class="w-full"><HeaderThemeControl bind:selectedTheme /></li>
      <li class="w-full"><HeaderGitHubButton /></li>
    </ul>
  </div>
{/if}
