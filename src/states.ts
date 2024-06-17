import { writable } from 'svelte/store';
import { generateArray, shuffle } from './lib/randomized-array-generator';

export const arrayToSort = writable(shuffle(generateArray(300)));

export const running = writable(false);
