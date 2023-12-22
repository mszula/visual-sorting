<script lang="ts">
  export let bars: Array<SortElement>;
  export let height: number;
  export let osc: Oscillator;

  import { Canvas, Layer, type Render } from "svelte-canvas";
  import type { SortElement } from "./types";
  import type { Oscillator } from "tone";

  let render: Render;
  $: render = ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    const spaceWidth = 0.2;
    const barWidth = (width - (bars.length - 1) * spaceWidth) / bars.length;
    const oneStepSize = height / bars.length;

    for (let currentBar = 0; currentBar < bars.length; currentBar++) {
      const barSize = oneStepSize * bars[currentBar].value;
      if (bars[currentBar].makeSound) {
        // osc.frequency.value = bars[currentBar].value * 2;
      }
      if (bars[currentBar].processing) {
        context.fillStyle = "red";
      } else if (currentBar === bars[currentBar].onPlaceIndex) {
        context.fillStyle = "green";
      } else {
        context.fillStyle = "white";
      }
      context.fillRect(
        currentBar * (barWidth + spaceWidth),
        height - barSize,
        barWidth,
        barSize
      );
    }
  };
</script>

<Canvas {height}>
  <Layer {render} />
</Canvas>
