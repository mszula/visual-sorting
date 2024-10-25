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
    $arrayToSort = shuffle(generateArray(size));
    reset();
  };

  const oddsEvens = () =>
    generateArray(size)
      .sort((a, b) => a - b)
      .reduce<[number[], number[]]>(
        ([odds, evens], v) => {
          v % 2 === 0 ? evens.push(v) : odds.push(v);
          return [odds, evens];
        },
        [[], []]
      );

  const valley = () => {
    const [odds, evens] = oddsEvens();
    $arrayToSort = [...odds.reverse(), ...evens];

    reset();
  };

  const mountain = () => {
    const [odds, evens] = oddsEvens();
    $arrayToSort = [...odds, ...evens.reverse()];

    reset();
  };
</script>

<div class="mb-2 lg:mb-4">
  <div class="join">
    <button
      class="btn join-item {$running
        ? 'btn-secondary'
        : 'btn-primary'} lg:btn-lg lg:w-24"
      on:click={start}>{$running ? 'Stop' : 'Start'}</button
    >
    <button class="btn join-item lg:btn-lg lg:w-24" on:click={step}>Step</button
    >
  </div>
  <button class="btn lg:btn-lg" on:click={shuffleClick}>Shuffle</button>
</div>
<div>
  <button class="btn" on:click={reverse}>Reverse</button>
  <button class="btn" on:click={valley}>Valley</button>
  <button class="btn" on:click={mountain}>Mountain</button>
</div>
