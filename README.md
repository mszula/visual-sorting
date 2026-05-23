# 🔮 🔈 Visual Sorting aka The Sound Of Sorting

Visual Sorting is a tool that provides a visualization of sorting algorithms, accompanied by an auditory experience. It allows users to witness how various sorting algorithms work through dynamic horizontal bars.

https://github.com/user-attachments/assets/2b9674c5-c705-4a22-ba6a-474cfc11cddd

## 🚀 Play with it

[https://mszula.github.io/visual-sorting/](https://mszula.github.io/visual-sorting/)

## 🌟 Features

- **Dynamic Visualization**: Vertical bars present the sorting process in real-time.
- **Step-by-Step Exploration**: Go through each step of the algorithm, and analyze what going on.
- **Sound Experience**: Each vertical bar represents a value in the sorting array. As the algorithm works on a bar, a sound is produced based on its height. There are 24 different sound oscillator options to choose from.
- **Side-by-Side Compare Mode**: Race two algorithms on the same array — toggle the compare icon in the header, pick algorithms per panel, switch between horizontal and vertical layout.
- **Live Metrics**: Comparisons, swaps and array accesses counted in real time and displayed in the header. Non-comparison sorts (Counting, Radix) clearly show `Cmp = 0`.
- **Keyboard Shortcuts**: `Space` start/stop, `→` step, `R` shuffle, `↑/↓` faster/slower, `[/]` previous/next algorithm, `M` mute, `?` opens the full reference.
- **Input Array Options**: Shuffle, Reverse, Valley, Mountain, **Wave**, **Nearly Sorted** and **Pipe Organ** patterns. Array sizes from 2 to 1024 elements. The selected pattern persists when you resize.
- **Adjustable Speed**: Control the pace by dynamically changing the delay, to speed up or slow down the process, with precision up to 500 ms.
- **Persistent Preferences**: Array size, delay, sound type and selected pattern survive page reloads.
- **Themes**: Various themes from DaisyUI so that everyone can find something for themselves.

## 🤖 Supported Sorting Algorithms

- [Bubble Sort](https://en.wikipedia.org/wiki/Bubble_sort)
- [Quick Sort](https://en.wikipedia.org/wiki/Quicksort)
- [Shell Sort](https://en.wikipedia.org/wiki/Shellsort)
- [Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)
- [Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort)
- [Selection Sort](https://en.wikipedia.org/wiki/Selection_sort)
- [Radix LSD Sort](https://en.wikipedia.org/wiki/Radix_sort#Least_significant_digit_radix_sorts)
- [Radix MSD Sort](https://en.wikipedia.org/wiki/Radix_sort#Most_significant_digit_radix_sorts)
- [Heap Sort](https://en.wikipedia.org/wiki/Heapsort)
- [Bitonic Sort](https://en.wikipedia.org/wiki/Bitonic_sorter)
- [Tim Sort](https://en.wikipedia.org/wiki/Timsort)
- [Gnome Sort](https://en.wikipedia.org/wiki/Gnome_sort)
- [Cycle Sort](https://en.wikipedia.org/wiki/Cycle_sort)
- [Cocktail Sort](https://en.wikipedia.org/wiki/Cocktail_shaker_sort)
- [Pancake Sort](https://en.wikipedia.org/wiki/Pancake_sorting)
- [Stooge Sort](https://en.wikipedia.org/wiki/Stooge_sort)
- [Bogo Sort](https://en.wikipedia.org/wiki/Bogosort)
- [Exchange Sort](https://en.wikipedia.org/wiki/Sorting_algorithm#Exchange_sort)
- [Odd-Even Sort](https://en.wikipedia.org/wiki/Odd%E2%80%93even_sort)

### 🆕 Recently Added Algorithms

- [Counting Sort](https://en.wikipedia.org/wiki/Counting_sort) - Non-comparison sorting algorithm that counts occurrences of each value
- [Comb Sort](https://en.wikipedia.org/wiki/Comb_sort) - Improved Bubble Sort variant that uses gap-based comparisons
- [Intro Sort](https://en.wikipedia.org/wiki/Introsort) - Hybrid algorithm combining Quick Sort, Heap Sort, and Insertion Sort

### 🌊 Recently Added Patterns

- **Wave** - Permutation of 1..n where bar heights trace a single sine period
- **Nearly Sorted** - Sorted array with ~5% random swaps — adaptive sorts (Insertion, Tim) shine here
- **Pipe Organ** - Three ascending mini-mountain peaks evoking organ pipes

## 🔍 Rationale

Visual Sorting was created to explore and learn Svelte, a modern JavaScript framework. Inspired by Timo Bingmann's captivating video "The Sound of Sorting" (https://www.youtube.com/watch?v=kPRA0W1kECg), which combines sorting algorithm visualizations with sound, I wanted to develop a tool that offers a similar educational and engaging experience. Visual Sorting aims to make learning sorting algorithms both enjoyable and insightful through dynamic visuals and sounds.

## 🙌 Contribution

If you have suggestions for how Visual Sorting could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you can, leave a star as well 🌟

## 💻 Setup

Built with ☕️ and ❤️ using Svelte, SvelteKit, Vite, Tailwind, and DaisyUI.

Install dependencies:

```bash
npm install
```

Start the project:

```bash
npm run dev
```

And that's it 😄

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mszula/visual-sorting&type=Date)](https://star-history.com/#mszula/visual-sorting&Date)

## 📄 License

[ISC](https://github.com/mszula/visual-sorting/blob/main/LICENSE) © 2024 Mateusz Szuła
