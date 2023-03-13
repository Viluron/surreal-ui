<script lang="ts">
	import LoadingSpinner from './lib/components/LoadingSpinner.svelte';
	import Layout from './lib/Layout.svelte';
	import Login from './lib/Login.svelte';
	import { LOGGED_IN } from './stores/user';

	let loading = false;

	let loggedIn;
	LOGGED_IN.subscribe(value => (loggedIn = value));

	function login({ detail: success }) {
		loading = false;

		if (!success) return;

		LOGGED_IN.set(true);
	}
</script>

<main>
	<LoadingSpinner visible={loading} />
	{#if !loggedIn}
		<Login on:submit={() => (loading = true)} on:login={login} />
	{:else}
		<Layout />
	{/if}
</main>

<style>
</style>
