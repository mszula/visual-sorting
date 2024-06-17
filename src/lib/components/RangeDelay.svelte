<script lang="ts">
  export let delay: number;
</script>

<label class="form-control w-full">
  <div class="label">
    <span class="label-text">Delay</span>
    <span class="label-text-alt">{delay} ms</span>
  </div>
  <input
    id="delay"
    name="delay"
    class="range range-sm"
    max="20"
    min="0"
    step="0.1"
    type="range"
    bind:value={delay}
  />
</label>
