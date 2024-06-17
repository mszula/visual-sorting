<script lang="ts">
  export let size: number;
  export let step: () => void;
  export let reset: () => void;

  import { arrayToSort, running } from '../../states';
  import { generateArray, shuffle } from '../randomized-array-generator';

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
    class="btn {$running ? 'btn-secondary' : 'btn-primary'} btn-lg w-24"
    on:click={start}>{$running ? 'Stop' : 'Start'}</button
  >
  <button class="btn btn-lg w-24" on:click={step}>Step</button>
</div>
<div>
  <button class="btn" on:click={shuffleClick}>Shuffle</button>
  <button class="btn" on:click={reverse}>Reverse</button>
</div>
