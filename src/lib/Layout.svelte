<script lang="ts">
	import Content from './layout/Content.svelte';
	import HeaderBar from './layout/HeaderBar.svelte';
	import Navigation from './layout/Navigation.svelte';
</script>

<div id="layout">
	<HeaderBar />
	<div class="w100 flex">
		<Navigation />
		<Content />
	</div>
</div>

<style>
	#layout > div {
		height: calc(100vh - 4rem);
	}
</style>
