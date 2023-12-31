<script lang="ts">
  export let size: number;
  export let step: () => void;
  export let reset: () => void;

  import { arrayToSort, running } from "../../states";
  import { generateArray, shuffle } from "../randomized-array-generator";

  const start = () => ($running = !$running);

  const reverse = () => {
    $arrayToSort = generateArray(size).reverse();
    reset();
  };

  const shuffleClick = () => {
    $arrayToSort = shuffle($arrayToSort);
    reset();
  };
</script>

<div class="mb-4">
  <button
    on:click={start}
    class="btn {$running ? 'btn-secondary' : 'btn-primary'} btn-lg w-24"
    >{$running ? "Stop" : "Start"}</button
  >
  <button on:click={step} class="btn btn-lg w-24">Step</button>
</div>
<div>
  <button on:click={shuffleClick} class="btn">Shuffle</button>
  <button on:click={reverse} class="btn">Reverse</button>
</div>
