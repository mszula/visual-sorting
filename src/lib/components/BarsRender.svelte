<script lang="ts">
  export let bars: Array<SortElement>;
  export let theme: CustomTheme[string];

  import { Canvas, Layer, type Render } from "svelte-canvas";
  import type { SortElement } from "../types";
  import type { CustomTheme } from "daisyui";
  import { playValue } from "../sound";

  let render: Render;
  $: render = ({ context, width, height }) => {
    context.fillStyle = theme["base-100"];
    context.fillRect(0, 0, width, height);

    const spaceWidth = 0.2;
    const barWidth = (width - (bars.length - 1) * spaceWidth) / bars.length;
    const oneStepSize = height / bars.length;

    for (let currentBar = 0; currentBar < bars.length; currentBar++) {
      const barSize = oneStepSize * bars[currentBar].value;
      if (bars[currentBar].accesing) {
        context.fillStyle = theme.accent;
      } else if (currentBar === bars[currentBar].value - 1) {
        context.fillStyle = theme.primary;
      } else {
        context.fillStyle = theme["neutral-content"] || theme["neutral"];
      }

      if (bars[currentBar].makeSound) {
        playValue(bars[currentBar].value);
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

<Canvas autoplay>
  <Layer {render} />
</Canvas>
