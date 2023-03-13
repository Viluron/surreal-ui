import type { Tab } from '../constants/types';
import { writable } from 'svelte/store';

export const ACTIVE_TAB = writable<Tab>('home');
