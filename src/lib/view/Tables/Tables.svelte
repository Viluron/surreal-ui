<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '../../../lib/components/Icon.svelte';
	import { DATABASE, TABLE, TABLES } from '../../../stores/database';
	import { query } from '../../../util/request';
	import Header from './Header.svelte';

	let database = $DATABASE;

	let tables: any = [];
	tables = TABLES.subscribe(value => (tables = value));

	let currentTable;
	currentTable = TABLE.subscribe(value => (currentTable = value));

	async function getTables() {
		let response = await query(`USE DB ${database}; INFO FOR DB;`);

		if (response.status) {
			console.log(response);
			// TODO show error
		}

		const tables = Object.keys(response.tb);
		TABLES.set(tables);
		return tables;
	}
</script>

<template>
	<Header />
	<div id="tables-table">
		<div class="tables-list">
			{#await getTables()}
				<!-- promise is pending -->
			{:then tables}
				{#each tables as tableName}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class={`table-entry flex ${tableName === currentTable ? 'selected' : ''}`}
						on:click={() => TABLE.set(tableName)}
					>
						<Icon icon="grid_on" size="32px" />
						<span class="name">{tableName}</span>
					</div>
				{/each}
			{/await}
		</div>
	</div>
</template>

<style scoped>
	.table-entry {
		height: 4rem;
		font-weight: normal;
		padding-left: 1.5rem;
		justify-self: flex-start;
		align-items: center;
		border-bottom: 1px solid var(--lines);
	}

	.table-entry .name {
		margin-left: 1rem;
	}

	.tables-list .table-entry:hover {
		background: var(--lines);
		cursor: pointer;
	}

	#tables-table {
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	.selected {
		color: var(--hover-color);
	}

	.tables-list {
		background: var(--boxes-color);
		height: 4rem;
		font-weight: 500;
		width: 12.5vw;
		min-width: 239px;
		height: 100%;
		align-items: center;
		border-right: 1px solid var(--lines);
	}
</style>
