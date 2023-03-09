import { writable, type Writable } from 'svelte/store';

const basicAuth = writable<string>('');
