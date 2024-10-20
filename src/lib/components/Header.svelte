<script lang="ts">
  import HeaderSoundControl from './HeaderSoundControl.svelte';
  import { type OscillatorType } from '../sound';
  import HeaderThemeControl from './HeaderThemeControl.svelte';
  import { base } from '$app/paths';

  export let selectedTheme: string;
  export let oscillatorType: OscillatorType;
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost" href="{base}/">
      <span class="text-lg md:text-xl"
        >Visual Sorting <span class="text-sm">aka The Sound Of Sorting</span
        ></span
      >
    </a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1 items-center">
      <HeaderSoundControl bind:oscillatorType />
      <HeaderThemeControl bind:selectedTheme />
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
