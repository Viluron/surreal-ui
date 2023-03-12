<script lang="ts">
	import NavItem from './NavItem.svelte';
</script>

<div id="navigation">
	<div class="center h100 flex-column">
		<NavItem icon="home" text="Home" />
		<NavItem icon="grid_on" text="Tables" selected />
	</div>
</div>

<style>
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
