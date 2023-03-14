<script lang="ts">
	import LoadingSpinner from './lib/components/LoadingSpinner.svelte';
	import Layout from './lib/Layout.svelte';
	import Login from './lib/Login.svelte';
	import { LOADING } from './stores/app';
	import { LOGGED_IN } from './stores/user';

	function login({ detail: success }) {
		LOADING.set(false);

		if (!success) return;

		LOGGED_IN.set(true);
	}
</script>

<main>
	<LoadingSpinner visible={$LOADING} />
	{#if !$LOGGED_IN}
		<Login on:submit={() => LOADING.set(true)} on:login={login} />
	{:else}
		<Layout />
	{/if}
</main>

<style>
</style>
