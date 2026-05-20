<script lang="ts">
  import HeaderSoundControl from './HeaderSoundControl.svelte';
  import { type OscillatorType } from '../sound';
  import HeaderThemeControl from './HeaderThemeControl.svelte';
  import { base } from '$app/paths';
  import HeaderGitHubButton from './HeaderGitHubButton.svelte';
  import HeaderCoffeeButton from './HeaderCoffeeButton.svelte';
  import HeaderHelpButton from './HeaderHelpButton.svelte';
  import MobileHeaderButtons from './mobile/MobileHeaderButtons.svelte';

  export let selectedTheme: string;
  export let oscillatorType: OscillatorType;
  export let openHelp: () => void;
</script>

<div class="navbar bg-base-100 relative">
  <div class="flex-1 min-w-0">
    <a class="btn btn-ghost px-2 md:px-4" href="{base}/">
      <span class="text-lg md:text-xl truncate">
        Visual Sorting
        <span class="hidden sm:inline text-sm">aka The Sound Of Sorting</span>
      </span>
    </a>
  </div>

  <div class="hidden md:flex flex-none">
    <ul class="menu menu-horizontal px-1 items-center">
      <li><HeaderSoundControl bind:oscillatorType /></li>
      <li><HeaderThemeControl bind:selectedTheme /></li>
    </ul>
    <HeaderHelpButton onClick={openHelp} />
    <HeaderGitHubButton />
    <HeaderCoffeeButton />
  </div>

  <MobileHeaderButtons bind:oscillatorType bind:selectedTheme {openHelp} />
</div>
