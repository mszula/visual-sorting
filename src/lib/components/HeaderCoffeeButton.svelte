<script lang="ts">
  import { trackEvent } from '../umami';

  const handleClick = () => {
    trackEvent('external-link', { destination: 'ko-fi' });
  };
</script>

<a
  class="lg:btn lg:btn-square lg:btn-ghost"
  href="https://ko-fi.com/mszula"
  target="_blank"
  on:click={handleClick}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-[24px] h-[24px]"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path d="M10 2v2" /><path d="M14 2v2" /><path
      d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"
    /><path d="M6 2v2" /></svg
  >
  <span class="lg:hidden inline">https://ko-fi.com/mszula</span>
</a>
