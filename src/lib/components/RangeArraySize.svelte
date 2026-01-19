<script lang="ts">
  export let size: number;

  import { running } from '../../states';
  import { trackEvent } from '../umami';
</script>

<label class="form-control w-full mb-2">
  <div class="label">
    <span class="label-text">Array size</span>
    <span class="label-text-alt">{size} bars</span>
  </div>
  <input
    id="size"
    name="size"
    class="range range-sm range-primary"
    disabled={$running}
    max="1024"
    min="2"
    type="range"
    bind:value={size}
  />
</label>
