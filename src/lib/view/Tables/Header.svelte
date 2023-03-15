<script lang="ts">
</script>

<div id="tables-view-header" class="flex flex-row">
	<div class="tables-header flex">
		<span>Tables</span>
	</div>
	<div class="table-actions flex">
		<span>[buttons]</span>
	</div>
</div>

<style scoped>
	#tables-view-header {
		height: 4rem;
		border-bottom: 1px solid var(--lines);
		align-items: center;
		background: var(--boxes-color);
	}

	#tables-view-header .tables-header {
		font-weight: 500;
		width: 12.5vw;
		min-width: 239px;
		height: 100%;
		align-items: center;
		border-right: 1px solid var(--lines);
	}

	#tables-view-header div span {
		margin-left: 1rem;
	}

	.table-actions {
		align-items: center;
		justify-content: flex-start;
	}
</style>
