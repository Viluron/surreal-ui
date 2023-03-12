<script lang="ts">
	import Icon from '../components/Icon.svelte';

	export let icon: string;
	export let text: string;
	export let selected: boolean = false;

	let item: HTMLElement = undefined;
	let hover = false;

	function toggleHover(value: boolean) {
		hover = value;
	}
</script>

<div
	class={`nav-item center ${hover ? 'hover' : ''} ${selected ? 'selected' : ''}`}
	bind:this={item}
	on:mouseenter={() => toggleHover(true)}
	on:mouseleave={() => toggleHover(false)}
>
	<Icon {icon} size="32px" />
	<span class="nav-item-text">{text}</span>
</div>

<style>
	.nav-item {
		width: 100%;
		padding: 0.5em 1.5em;
	}

	.nav-item.hover,
	.nav-item.selected {
		color: var(--hover-color);
		cursor: pointer;
		background: var(--lines);
		border-radius: 8px;
	}

	.nav-item span {
		color: var(--text-color);
	}

	.nav-item-text {
		margin-left: 1.5rem;
		font-weight: 1.5rem;
	}
</style>
