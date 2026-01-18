<script lang="ts">
  import { onMount } from 'svelte';
  import { running } from '../../states';
  import { trackEvent } from '../umami';

  let ref: HTMLDialogElement;
  let timedOut = false;
  let showed = false;

  onMount(() => {
    if (localStorage.getItem('leaved-a-star')) {
      return;
    }

    setTimeout(() => {
      timedOut = true;
    }, 60 * 1000);
  });

  $: if (!$running && timedOut && !showed) {
    ref.showModal();
    showed = true;
    trackEvent('modal-shown', { modal: 'github-star' });
  }

  const click = () => {
    localStorage.setItem('leaved-a-star', 'yup');
    ref.close();
    trackEvent('modal-action-github', { action: 'star-clicked' });
  };

  const dismiss = () => {
    trackEvent('modal-action-github', { action: 'maybe-later' });
  };
</script>

<dialog
  id="leave_a_star"
  class="modal modal-bottom sm:modal-middle"
  {...$$restProps}
  bind:this={ref}
>
  <div class="modal-box">
    <h3 class="text-lg font-bold">
      ⭐️ Support This Project by Leaving a Star!
    </h3>
    <p class="py-4">
      If you find this project helpful or inspiring, consider showing your
      support by leaving a star on GitHub. Your feedback motivates us to keep
      improving!
    </p>
    <div class="modal-action">
      <a
        href="https://github.com/mszula/visual-sorting"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
        on:click={click}
      >
        ⭐️ Star on GitHub
      </a>
      <form method="dialog">
        <button class="btn" on:click={dismiss}>Maybe Later</button>
      </form>
    </div>
  </div>
</dialog>
