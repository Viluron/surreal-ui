<script lang="ts">
	import NavItem from './NavItem.svelte';
	import Select from '../components/Select.svelte';
	import { DATABASES } from '../../stores/database';
	import Divider from '../components/Divider.svelte';

	let options = $DATABASES;
</script>

<div id="navigation" class="flex flex-column">
	<div id="database-select" class="center">
		<div class="select-wrapper">
			<Select {options} />
		</div>
	</div>
	<div class="nav-item-container flex h100 flex-column">
		<NavItem icon="home" text="Home" tab="home" />
		<Divider height="1.5rem" />
		<NavItem icon="database" text="SQL query" tab="query" />
		<NavItem icon="grid_on" text="Tables" tab="tables" />
		<Divider height="1.5rem" />
		<NavItem icon="settings" text="Settings" tab="settings" />
	</div>
</div>

<style scoped>
	#database-select {
		height: 5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.select-wrapper {
		width: 90%;
	}

	#navigation {
		display: flex;
		height: 100%;
		min-width: 240px;
		width: 12.5vw;
		background-color: var(--back-color);
		border-width: 1px;
		border-color: var(--lines);
		border-right-style: solid;
	}

	.nav-item-container {
		row-gap: 0.25em;
		align-items: center;
	}
</style>
