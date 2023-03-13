import { writable } from 'svelte/store';

export const LOGGED_IN = writable(false);
export const USERNAME = writable('');
export const PASSWORD = writable('');
export const DATABASE_URL = writable('');
export const NAMESPACE = writable('');
