<script lang="ts">
  let ref: HTMLDialogElement;

  export const open = () => ref?.showModal();
  export const close = () => ref?.close();

  const shortcuts: { keys: string[]; label: string }[] = [
    { keys: ['Space'], label: 'Start / Stop' },
    { keys: ['→'], label: 'Step' },
    { keys: ['R'], label: 'Shuffle' },
    { keys: ['↑', '↓'], label: 'Faster / Slower' },
    { keys: ['[', ']'], label: 'Previous / Next algorithm' },
    { keys: ['M'], label: 'Mute / Unmute' },
    { keys: ['?'], label: 'Show this help' },
  ];
</script>

<dialog bind:this={ref} class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold mb-4">Keyboard shortcuts</h3>
    <table class="table table-sm">
      <tbody>
        {#each shortcuts as { keys, label }}
          <tr>
            <td class="whitespace-nowrap">
              {#each keys as k, i}
                {#if i > 0}<span class="opacity-50 mx-1">/</span>{/if}
                <kbd class="kbd kbd-sm">{k}</kbd>
              {/each}
            </td>
            <td>{label}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <p class="text-xs opacity-60 mt-3">
      Shortcuts are disabled while typing in inputs.
    </p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
