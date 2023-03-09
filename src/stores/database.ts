import { writable } from 'svelte/store';

export const NAMESPACES = writable<string[]>([]);
export const TABLES = writable<string[]>([]);
export const DATABASES = writable<string[]>([]);

export const DATABASE = writable<string>('');
export const TABLE = writable<string>('');
export const NAMESPACE = writable<string>('');
