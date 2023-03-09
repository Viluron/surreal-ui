<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Input from './components/Input.svelte';

	const dispatch = createEventDispatcher();

	let url: string = undefined;
	let namespace: string = undefined;
	let username: string = undefined;
	let password: string = undefined;
	let error: boolean = false;

	async function login() {
		dispatch('submit');

		// TODO - remove /sql
		const databases = await fetch(url || '/sql', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				Authorization: 'Basic ' + btoa(username + ':' + password),
				NS: namespace
			},
			body: 'INFO FOR KV;'
		});

		error = databases.status !== 200;

		if (error) return dispatch('login', error);
	}
</script>

<div class="login">
	<div class="login-wrapper">
		<div class="heading">
			<h1>Sign In</h1>
		</div>
		<div class="error">
			{#if error}
				<p>Username or password not correct!</p>
			{/if}
		</div>
		<div id="loginForm" class="login-form">
			<Input placeholder="Database URL" class="test" on:change={({ detail }) => (url = detail)} />
			<div class="spacer" />
			<Input placeholder="Namespace" class="test" on:change={({ detail }) => (namespace = detail)} />
			<div class="spacer" />
			<Input placeholder="Username" class="test" on:change={({ detail }) => (username = detail)} />
			<div class="spacer" />
			<Input placeholder="Password" type="password" on:change={({ detail }) => (password = detail)} />
			<div class="spacer" />
			<button type="submit" on:click={login}>
				<span>Login</span>
			</button>
		</div>
	</div>
</div>

<style scoped>
	.login h1 {
		margin: 0;
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.login {
		background-color: var(--boxes-color);
		min-height: 20vh;
		min-width: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 2em;
	}

	.error {
		color: red;
	}

	.login-form {
		margin-bottom: 1em;
		row-gap: 1em;
	}

	.spacer {
		width: 100%;
		height: 2em;
	}

	.heading {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 2em;
	}

	button {
		background: var(--gradient);
		border-radius: 4px;
		color: var(--faint-color);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1px;
		border: none;
		width: 100%;
	}

	button:hover {
		cursor: pointer;
	}

	button:hover > span {
		background: transparent;
		color: var(--text-color);
	}

	button > span {
		font-size: 1.2em;
		font-weight: bold;
		height: 2.5em;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--boxes-color);
		transition: 0.3s;
	}
</style>
