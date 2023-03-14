import type { Tab } from '../constants/types';
import { writable } from 'svelte/store';

export const ACTIVE_TAB = writable<Tab>('home');
export const LOADING = writable<boolean>(false);

// settings
export const GLOW_ACTIVE = writable<boolean>(true);
