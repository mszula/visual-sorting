export type Pattern =
  | 'shuffle'
  | 'reverse'
  | 'valley'
  | 'mountain'
  | 'nearly-sorted'
  | 'sine'
  | 'pipe-organ';

export const generateArray = (size: number): number[] =>
  Array.from({ length: size }, (_value, index) => index + 1);

export const shuffle = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const splitOddsEvens = (size: number): [number[], number[]] =>
  generateArray(size).reduce<[number[], number[]]>(
    ([odds, evens], v) => {
      v % 2 === 0 ? evens.push(v) : odds.push(v);
      return [odds, evens];
    },
    [[], []]
  );

export const applyPattern = (size: number, pattern: Pattern): number[] => {
  switch (pattern) {
    case 'reverse':
      return generateArray(size).reverse();
    case 'shuffle':
      return shuffle(generateArray(size));
    case 'valley': {
      const [odds, evens] = splitOddsEvens(size);
      return [...odds.reverse(), ...evens];
    }
    case 'mountain': {
      const [odds, evens] = splitOddsEvens(size);
      return [...odds, ...evens.reverse()];
    }
    case 'nearly-sorted': {
      const arr = generateArray(size);
      const swaps = Math.max(1, Math.floor(size * 0.05));
      for (let i = 0; i < swaps; i++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        [arr[a], arr[b]] = [arr[b], arr[a]];
      }
      return arr;
    }
    case 'sine': {
      // Permutation of 1..size where bar heights trace a single sine period.
      // Each index gets a rank based on sin(i), so all values are unique
      // integers — sort algorithms see a proper permutation.
      const scored = Array.from({ length: size }, (_, i) => ({
        i,
        s: Math.sin((i / Math.max(size - 1, 1)) * 2 * Math.PI),
      }));
      scored.sort((a, b) => a.s - b.s);
      const result = new Array<number>(size);
      scored.forEach(({ i }, rank) => {
        result[i] = rank + 1;
      });
      return result;
    }
    case 'pipe-organ': {
      // Three ascending mountain peaks (mini-mountains with growing value
      // ranges), evoking the silhouette of organ pipes.
      const peaks = Math.min(3, Math.max(1, size));
      const peakSize = Math.floor(size / peaks);
      const result: number[] = [];
      let valOffset = 0;
      for (let p = 0; p < peaks; p++) {
        const sz = p === peaks - 1 ? size - valOffset : peakSize;
        const sub = applyPattern(sz, 'mountain').map((v) => v + valOffset);
        result.push(...sub);
        valOffset += sz;
      }
      return result;
    }
  }
};
