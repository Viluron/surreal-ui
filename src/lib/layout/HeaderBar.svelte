<script lang="ts">
</script>

<div id="headerbar">
	<div class="center">
		<h2>SurrealDB</h2>
	</div>
	<div />
</div>

<style>
	#headerbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 4rem;
		background-color: var(--back-color);
		border-width: 1px;
		border-color: var(--lines);
		border-bottom-style: solid;
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
</style>
