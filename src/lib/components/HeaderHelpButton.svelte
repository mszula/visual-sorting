<script lang="ts">
  import { trackEvent } from '../umami';

  export let onClick: () => void;

  const handleClick = () => {
    trackEvent('help-opened', { source: 'header-button' });
    onClick();
  };
</script>

<button
  class="md:btn md:btn-square md:btn-ghost"
  aria-label="Keyboard shortcuts"
  title="Keyboard shortcuts (?)"
  on:click={handleClick}
>
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
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M6 8h.01" />
    <path d="M10 8h.01" />
    <path d="M14 8h.01" />
    <path d="M18 8h.01" />
    <path d="M6 12h.01" />
    <path d="M10 12h.01" />
    <path d="M14 12h.01" />
    <path d="M18 12h.01" />
    <path d="M7 16h10" />
  </svg>
  <span class="md:hidden inline">Keyboard shortcuts</span>
</button>
