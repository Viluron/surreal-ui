<script lang="ts">
	import { DATABASE, DATABASES, NAMESPACES, TABLE, TABLES } from '../../stores/database';
	import { DATABASE_URL, LOGGED_IN, NAMESPACE, PASSWORD, USERNAME } from '../../stores/user';

	function logout() {
		LOGGED_IN.set(false);
		USERNAME.set('');
		PASSWORD.set('');
		DATABASE_URL.set('');
		NAMESPACE.set('');

		NAMESPACES.set([]);
		TABLES.set([]);
		DATABASES.set([]);

		DATABASE.set('');
		TABLE.set('');
		NAMESPACE.set('');
	}
</script>

<div id="headerbar">
	<div class="flex">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="logo-wrapper center" on:click={logout}>
			<img src="/surreal-logo.png" alt="surreal-logo" height="38px" />
		</div>
		<h2>SurrealDB Manager</h2>
	</div>
	<div />
</div>

<style>
	#headerbar {
		display: flex;
		height: 4rem;
		background-color: var(--back-color);
		border-width: 1px;
		border-color: var(--lines);
		border-bottom-style: solid;
	}

	#headerbar > div {
		align-items: center;
	}

	#headerbar > div:nth-child(1) {
		width: 25vw;
		min-width: 480px;
		height: 100%;
		border-right: 1px solid var(--lines);
	}

	#headerbar > div:nth-child(2) {
		width: 75vw;
		height: 100%;
	}

	h2 {
		margin: 0;
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.logo-wrapper {
		padding: 0.5rem;
		height: 2rem;
		background: var(--boxes-color);
		border-radius: 4px;
		aspect-ratio: 1/1;
		justify-self: flex-start;
		margin: 0 2rem;
	}

	.logo-wrapper:hover {
		box-shadow: var(--box-shadow);
		background: var(--gradient);
		cursor: pointer;
	}
</style>
