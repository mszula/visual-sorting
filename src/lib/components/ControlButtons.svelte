<script lang="ts">
  export let running: boolean;
  export let start: () => void;
  export let step: () => void;
</script>

<div class="mb-4">
  <button
    on:click={start}
    class="btn {running ? 'btn-secondary' : 'btn-primary'} btn-lg w-28"
    >{running ? "Stop" : "Start"}</button
  >
  <button on:click={step} class="btn btn-lg w-28">Step</button>
</div>
<div>
  <button on:click={() => {}} class="btn">Shuffle</button>
  <button on:click={() => {}} class="btn">Reverse</button>
  <button on:click={() => {}} class="btn">Reset</button>
</div>
