<script lang="ts">
  import HeaderSoundControl from './HeaderSoundControl.svelte';
  import { type OscillatorType } from '../sound';
  import HeaderThemeControl from './HeaderThemeControl.svelte';
  import { base } from '$app/paths';
  import HeaderGitHubButton from './HeaderGitHubButton.svelte';
  import MobileHeaderButtons from './mobile/MobileHeaderButtons.svelte';

  export let selectedTheme: string;
  export let oscillatorType: OscillatorType;
</script>

<div class="navbar bg-base-100 relative">
  <div class="flex-1">
    <a class="btn btn-ghost" href="{base}/">
      <span class="text-lg md:text-xl">
        Visual Sorting <span class="text-sm">aka The Sound Of Sorting</span>
      </span>
    </a>
  </div>

  <div class="hidden md:flex flex-none">
    <ul class="menu menu-horizontal px-1 items-center">
      <li><HeaderSoundControl bind:oscillatorType /></li>
      <li><HeaderThemeControl bind:selectedTheme /></li>
    </ul>
    <HeaderGitHubButton />
  </div>

  <MobileHeaderButtons bind:oscillatorType bind:selectedTheme />
</div>
