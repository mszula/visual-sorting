<script lang="ts">
  export let size: number;

  import { running } from "../../states";

  const steps = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];

  if (!steps.includes(size)) {
    // find the closest size to steps
    size = steps.reduce((prev, curr) =>
      Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
    );
  }
</script>

<label class="form-control w-full mb-2">
  <div class="label">
    <span class="label-text">Array size</span>
    <span class="label-text-alt">{size} bars</span>
  </div>
  <div class="join">
    {#each steps as value}
      <input
        class="join-item btn btn-sm h-5 min-h-5"
        type="radio"
        name="options"
        {value}
        aria-label={value.toString()}
        bind:group={size}
        disabled={$running}
      />
    {/each}
  </div>
</label>
