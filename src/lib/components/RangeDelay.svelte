<script lang="ts">
  export let delay: number;
</script>

<label class="form-control w-full">
  <div class="label">
    <span class="label-text">Delay</span>
    <span class="label-text-alt">{delay} ms</span>
  </div>
  <input
    type="range"
    id="delay"
    name="delay"
    min="0"
    max="20"
    step="0.1"
    bind:value={delay}
    class="range max-w-xs range-sm"
  />
</label>
