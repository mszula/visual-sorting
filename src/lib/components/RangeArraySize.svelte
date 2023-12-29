<script lang="ts">
  export let size: number;

  import { running } from "../../states";
</script>

<label class="form-control w-full mb-2">
  <div class="label">
    <span class="label-text">Array size</span>
    <span class="label-text-alt">{size} bars</span>
  </div>
  <input
    type="range"
    id="size"
    name="size"
    min="2"
    max="1000"
    bind:value={size}
    disabled={$running}
    class="range range-sm range-primary"
  />
</label>
