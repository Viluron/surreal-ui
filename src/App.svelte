<script lang="ts">
	import LoadingSpinner from './lib/components/LoadingSpinner.svelte';
	import Layout from './lib/Layout.svelte';
	import Login from './lib/Login.svelte';

	let loading = false;
	let loggedIn = false;

	function login({ detail: success }) {
		loading = false;

		if (!success) return;

		loggedIn = true;
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
