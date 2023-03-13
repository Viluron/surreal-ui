<script lang="ts">
	import NavItem from './NavItem.svelte';
	import Select from '../components/Select.svelte';
	import { DATABASES } from '../../stores/database';

	// let options = $DATABASES;
	const options = [];

	for (let i = 0; i < 50; i++) {
		options.push('Database ' + i);
	}
</script>

<div id="navigation" class="flex flex-column">
	<div id="database-select" class="center">
		<div class="select-wrapper">
			<Select {options} />
		</div>
	</div>
	<div class="center h100 flex-column">
		<NavItem icon="home" text="Home" />
		<NavItem icon="grid_on" text="Tables" selected />
	</div>
</div>

<style>
	#database-select {
		margin-top: 1em;
		width: 100%;
	}

	.select-wrapper {
		width: 90%;
	}

	#navigation {
		display: flex;
		justify-content: center;
		height: 100%;
		min-width: 240px;
		width: 12.5vw;
		background-color: var(--back-color);
		border-width: 1px;
		border-color: var(--lines);
		border-right-style: solid;
	}
</style>
