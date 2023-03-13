<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Input from './components/Input.svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { DATABASE_URL, NAMESPACE, PASSWORD, USERNAME } from '../stores/user';
	import { DATABASE, DATABASES, NAMESPACES } from '../stores/database';
	import { query } from '../util/request';
	import type { IInfoKV } from 'src/constants/types';

	const dispatch = createEventDispatcher();

	let url: string = undefined;
	let username: string = undefined;
	let password: string = undefined;
	let error = '';

	async function login() {
		if (!url || !username || !password) {
			error = 'Database URL, username and password are required!';
			return;
		}

		dispatch('submit');

		USERNAME.set(username);
		PASSWORD.set(password);
		DATABASE_URL.set(url);

		let response = await query('INFO FOR KV;');

		if (response.status) {
			console.log(response);
			dispatch('login', false);
			error = 'Username or password not correct!';
			return;
		}

		response = response as IInfoKV;
		const namespaces = Object.keys(response.ns);
		NAMESPACES.set(namespaces || []);

		// No namespaces found
		if (namespaces.length === 0) {
			dispatch('login', true);
			return;
		}

		NAMESPACE.set(namespaces[0]);

		response = await query('USE NS ' + namespaces[0] + '; INFO FOR NS;');

		if (response.status) {
			console.log(response);
		}

		const databases = Object.keys(response.db);
		DATABASES.set(databases || []);

		dispatch('login', true);
	}
</script>

<div class="login">
	<div class="login-wrapper">
		<div class="heading">
			<h1>Sign In</h1>
		</div>
		<div id="loginForm" class="login-form">
			<div class="error">
				{#if !!error}
					<p>{error}</p>
				{/if}
			</div>
			<Input placeholder="Database URL" class="test" on:change={({ detail }) => (url = detail)} />
			<Input placeholder="Username" class="test" on:change={({ detail }) => (username = detail)} />
			<Input placeholder="Password" type="password" on:change={({ detail }) => (password = detail)} />
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
		width: 400px;
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
		color: var(--error-color);
		text-align: center;
	}

	.login-form {
		row-gap: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.heading {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
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
		width: 250px;
	}

	button:hover {
		cursor: pointer;
	}

	button:hover > span {
		background: transparent;
		color: var(--text-color);
		box-shadow: var(--box-shadow);
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
