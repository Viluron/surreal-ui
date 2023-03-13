<script lang="ts">
	export let icon: string;
	export let color = 'currentColor';
	export let size = 'unset';
</script>

<template>
	<span class="material-symbols-outlined" style={`color: ${color}; font-size: ${size}`}>{icon}</span>
</template>

<style scoped>
	span {
		color: currentColor;
	}
</style>
