export type Pattern = 'shuffle' | 'reverse' | 'valley' | 'mountain';

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
  }
};
