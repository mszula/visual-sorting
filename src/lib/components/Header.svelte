<script lang="ts">
  import HeaderSoundControl from './HeaderSoundControl.svelte';
  import { type OscillatorType } from '../sound';
  import HeaderThemeControl from './HeaderThemeControl.svelte';
  import { base } from '$app/paths';
  import HeaderGitHubButton from './HeaderGitHubButton.svelte';
  import HeaderCoffeeButton from './HeaderCoffeeButton.svelte';
  import HeaderHelpButton from './HeaderHelpButton.svelte';
  import HeaderCompareButton from './HeaderCompareButton.svelte';
  import HeaderStats from './HeaderStats.svelte';
  import MobileHeaderButtons from './mobile/MobileHeaderButtons.svelte';
  import type { SortStats } from '../types';

  export let selectedTheme: string;
  export let oscillatorType: OscillatorType;
  export let openHelp: () => void;
  export let panels: { stats: SortStats; label?: string }[];
  export let compareMode: boolean;
  export let toggleCompareMode: () => void;
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

  <HeaderStats {panels} />

  <div class="hidden md:flex flex-none items-center gap-1">
    <span class="w-px h-6 bg-base-content/10 mx-1" aria-hidden="true" />
    <div class="tooltip tooltip-bottom" data-tip="Sound">
      <HeaderSoundControl bind:oscillatorType />
    </div>
    <div class="tooltip tooltip-bottom" data-tip="Theme">
      <HeaderThemeControl bind:selectedTheme />
    </div>
    <span class="w-px h-6 bg-base-content/10 mx-1" aria-hidden="true" />
    <div
      class="tooltip tooltip-bottom"
      data-tip={compareMode ? 'Disable compare' : 'Compare two algorithms'}
    >
      <HeaderCompareButton {compareMode} {toggleCompareMode} />
    </div>
    <div class="tooltip tooltip-bottom" data-tip="Keyboard shortcuts (?)">
      <HeaderHelpButton onClick={openHelp} />
    </div>
    <span class="w-px h-6 bg-base-content/10 mx-1" aria-hidden="true" />
    <div class="tooltip tooltip-bottom" data-tip="GitHub">
      <HeaderGitHubButton />
    </div>
    <div class="tooltip tooltip-bottom" data-tip="Buy me a coffee">
      <HeaderCoffeeButton />
    </div>
  </div>

  <MobileHeaderButtons
    bind:oscillatorType
    bind:selectedTheme
    {openHelp}
    {compareMode}
    {toggleCompareMode}
  />
</div>
