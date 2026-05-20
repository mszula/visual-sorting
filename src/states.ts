import { writable } from 'svelte/store';
import { applyPattern, type Pattern } from './lib/randomized-array-generator';

export const arrayToSort = writable(applyPattern(300, 'shuffle'));

export const running = writable(false);

export const pattern = writable<Pattern>('shuffle');
