<script lang="ts">
	import { flattenJSON } from 'src/util/flattenJSON';

	export let data: Array<{ [key: string]: any }> = [];

	let columns: string[] = [];

	$: data, (columns = getColumns(data));

	function getColumns(tableData) {
		let col = [];

		if (tableData.length === 0) return [];

		for (let entry of tableData) {
			let res = [...col, ...Object.keys(flattenJSON(entry))];

			res.reduce((_, val) => {
				if (col.includes(val)) return;

				col.push(val);
			});
		}

		const filtered = col.filter(c => c !== 'id');
		return ['id', ...filtered];
	}

	function getColumnLabel(column: string) {
		const args = column.split('.');
		return args[args.length - 1];
	}

	function getEntryData(entry: { [key: string]: any }, column: string) {
		const args = column.split('.');
		let res = entry;

		for (let arg of args) {
			res = res[arg];
		}

		return res ?? 'null';
	}
</script>

<div class="custom-table">
	<table>
		<thead>
			<tr>
				{#each columns as col}
					<th>{getColumnLabel(col)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as entry}
				<tr>
					{#each columns as col}
						<td>{getEntryData(entry, col)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style scoped>
	.custom-table {
		width: 100%;
		height: calc(100%);
		overflow: auto;
		text-align: left;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		overflow: auto;
	}

	table td:last-child {
		border-right: 1px solid var(--lines);
	}

	table th,
	table td {
		border: 1px solid var(--lines);
		border-top: none;
		border-left: none;
		height: 4rem;
		padding: 0 1rem;
		width: auto;
		min-width: 400px;
		background: var(--back-color);
	}

	.custom-table table th {
		background: var(--darker-color);
	}
</style>
