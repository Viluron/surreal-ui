<script lang="ts">
	export let width: string = '90%';
	export let height: string = '1rem';
</script>

<div class="divider" style={`height: ${height}`}>
	<div class="line" style={`width: ${width}`} />
</div>

<style scoped>
	.divider {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.line {
		height: 1px;
		background-color: var(--lines);
	}
</style>
