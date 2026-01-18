<script lang="ts">
  import { onMount } from 'svelte';
  import { running } from '../../states';
  import { trackEvent } from '../umami';

  let ref: HTMLDialogElement;
  let timedOut = false;
  let showed = false;

  onMount(() => {
    if (localStorage.getItem('kofi-support-shown')) {
      return;
    }

    setTimeout(() => {
      timedOut = true;
    }, 5 * 60 * 1000);
  });

  $: if (!$running && timedOut && !showed) {
    ref.showModal();
    showed = true;
    trackEvent('modal-shown', { modal: 'kofi-support' });
  }

  const handleClick = () => {
    localStorage.setItem('kofi-support-shown', 'true');
    ref.close();
    trackEvent('modal-action', { modal: 'kofi-support', action: 'kofi-clicked' });
  };

  const handleDismiss = () => {
    localStorage.setItem('kofi-support-shown', 'true');
    ref.close();
    trackEvent('modal-action', { modal: 'kofi-support', action: 'maybe-later' });
  };
</script>

<dialog
  id="kofi_support"
  class="modal modal-bottom sm:modal-middle"
  {...$$restProps}
  bind:this={ref}
>
  <div class="modal-box">
    <h3 class="text-lg font-bold">
      ☕ Glad You're Here!
    </h3>
    <p class="py-4">
      Hey! I'm Mateusz, and I'm passionate about creating interactive projects
      that combine education with visual joy. If Visual Sorting brings you happiness
      and you'd like to see more projects like this, consider supporting me on Ko-Fi.
    </p>
    <p class="text-sm opacity-70 pb-2">
      Your support allows me to dedicate more time to creating and sharing
      tools like this with the community. Every coffee really makes a difference! 🚀
    </p>
    <div class="modal-action">
      <a
        href="https://ko-fi.com/mszula"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
        on:click={handleClick}
      >
        ☕ Buy Me a Coffee
      </a>
      <form method="dialog">
        <button class="btn" on:click={handleDismiss}>Maybe Later</button>
      </form>
    </div>
  </div>
</dialog>
