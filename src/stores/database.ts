import { writable } from 'svelte/store';

export const tables = writable<string[]>([]);
export const databases = writable<string[]>([]);
