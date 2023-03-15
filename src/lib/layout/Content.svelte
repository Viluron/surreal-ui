<script lang="ts">
	import type { Tab } from '../../constants/types';
	import { ACTIVE_TAB } from '../../stores/app';
	import Home from '../view/Home.svelte';
	import Query from '../view/Query.svelte';
	import Settings from '../view/Settings/Settings.svelte';
	import Tables from '../view/Tables/Tables.svelte';

	let app: Tab;
	ACTIVE_TAB.subscribe(value => (app = value));
</script>

<div id="content">
	{#if app === 'home'}
		<Home />
	{:else if app === 'query'}
		<Query />
	{:else if app === 'tables'}
		<Tables />
	{:else if app === 'settings'}
		<Settings />
	{/if}
</div>

<style>
	#content {
		width: 87.5%;
	}
</style>
