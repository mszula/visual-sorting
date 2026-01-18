<script lang="ts">
  import { trackEvent } from '../umami';

  const handleGitHubClick = () => {
    trackEvent('external-link', { destination: 'github-profile' });
  };
</script>

<footer class="footer items-center p-4 bg-base-200">
  <aside class="items-center grid-flow-col">
    <p class="text-xs lg:text-sm">
      Built with ☕️ and ❤️ by <a
        class="link"
        href="https://github.com/mszula"
        target="_blank"
        on:click={handleGitHubClick}>mszula</a
      >
      using Svelte.
      <span class="text-xs opacity-30"
        >Version: {import.meta.env.VITE_GIT_COMMIT_REF}</span
      >
    </p>
  </aside>
</footer>
