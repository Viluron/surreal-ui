<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '../../../lib/components/Icon.svelte';
	import { DATABASE, TABLE, TABLES } from '../../../stores/database';
	import { httpRequest, query } from '../../../util/request';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	let tableData = {
		columns: [],
		data: []
	};

	let database = $DATABASE;

	$: $TABLE,
		() => {
			getTableData();
		};

	const onSelectTable = (tableName: string) => {
		TABLE.set(tableName);

		getTableData();
	};

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
			tableData.data = [];
			tableData.columns = [];
			return;
		}

		const data = response[0].result;

		if (!data) return;

		tableData.data = data;
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
						on:click={() => onSelectTable(tableName)}
					>
						<Icon icon="grid_on" size="32px" />
						<span class="name">{tableName}</span>
					</div>
				{/each}
			{/await}
		</div>
		<div class="flex-column w100">
			<div class="table-data ">
				<table>
					<thead>
						<tr>
							{#each tableData.columns as column}
								<th>{column}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each tableData.data as row}
							<tr>
								{#each tableData.columns as column}
									<td>{row[column]}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
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
		width: 100%;
	}
</style>
