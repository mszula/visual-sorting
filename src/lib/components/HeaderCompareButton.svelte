<script lang="ts">
  import { trackEvent } from '../umami';

  export let compareMode: boolean;
  export let toggleCompareMode: () => void;

  const handleCompare = () => {
    trackEvent('compare-toggle', { state: compareMode ? 'off' : 'on' });
    toggleCompareMode();
  };
</script>

<button
  class="md:btn md:btn-square md:btn-ghost {compareMode ? 'md:btn-active' : ''}"
  aria-label={compareMode ? 'Disable compare mode' : 'Enable compare mode'}
  title={compareMode ? 'Disable compare mode' : 'Compare two algorithms'}
  on:click={handleCompare}
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
    <rect width="8" height="16" x="3" y="4" rx="1" />
    <rect width="8" height="16" x="13" y="4" rx="1" />
  </svg>
  <span class="md:hidden inline">Compare</span>
</button>
