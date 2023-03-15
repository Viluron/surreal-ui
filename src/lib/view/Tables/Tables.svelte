<script lang="ts">
	import Icon from '../../../lib/components/Icon.svelte';
	import { DATABASE, TABLE, TABLES } from '../../../stores/database';
	import { httpRequest, query } from '../../../util/request';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Table from '../../components/Table/Table.svelte';

	let database = $DATABASE;
	let columns = [];
	let content = [];

	$: $TABLE,
		(() => {
			window.SurrealUi.log('Table changed. Loading data...');
			getTableData();
		})();

	const getTables = async () => {
		let response = await query(`USE DB ${database}; INFO FOR DB;`);

		if (response.status) {
			console.log(response);
			// TODO show error
		}

		const tables = Object.keys(response.tb);
		TABLES.set(tables);
		return tables;
	};

	const getTableData = async () => {
		const response = await httpRequest('get', $TABLE);

		if (response.length === 0 || response[0].status !== 'OK') {
			// TODO Error handling
			content = [];
			columns = [];
			return;
		}

		const data = response[0].result;

		if (!data) return;

		columns = Object.keys(data[0]);
		content = data;
	};
</script>

<template>
	<Header />
	<div id="tables-table">
		<div class="tables-list">
			{#await getTables() then}
				{#each $TABLES as tableName}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class={`table-entry flex ${tableName === $TABLE ? 'selected' : ''}`}
						on:click={() => TABLE.set(tableName)}
					>
						<Icon icon="grid_on" size="32px" />
						<span class="name">{tableName}</span>
					</div>
				{/each}
			{/await}
		</div>
		<div class="flex-column table-data-container">
			<div class="table-data">
				<Table data={content} />
			</div>
			<Footer />
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

	.table-data {
		height: calc(100% - 8rem);
	}

	.table-data-container {
		width: calc(75vw - 1px);
	}
</style>
