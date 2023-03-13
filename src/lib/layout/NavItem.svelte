<script lang="ts">
	import type { Tab } from 'src/constants/types';
	import { ACTIVE_TAB } from '../../stores/app';
	import Icon from '../components/Icon.svelte';

	export let tab: Tab;
	export let icon: string;
	export let text: string;

	let activeTab;
	ACTIVE_TAB.subscribe(value => (activeTab = value));

	let item: HTMLElement = undefined;
	let hover = false;

	function toggleHover(value: boolean) {
		hover = value;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`nav-item flex ${hover ? 'hover' : ''} ${activeTab === tab ? 'selected' : ''}`}
	bind:this={item}
	on:mouseenter={() => toggleHover(true)}
	on:mouseleave={() => toggleHover(false)}
	on:click={() => ACTIVE_TAB.set(tab)}
>
	<span class="icon flex">
		<Icon {icon} size="32px" />
	</span>
	<span class="nav-item-text">{text}</span>
</div>

<style>
	.nav-item {
		width: 90%;
		padding: 0.5em 0;
	}

	.selected,
	.hover {
		color: var(--hover-color);
		cursor: pointer;
		background: var(--lines);
		border-radius: 8px;
		transition: 0.3s;
	}

	.selected .icon,
	.hover .icon {
		color: var(--hover-color);
	}

	.nav-item span {
		color: var(--text-color);
	}

	.icon {
		margin-left: 1.4rem;
		align-items: center;
	}

	.nav-item-text {
		margin-left: 1.5rem;
		font-weight: 1.5rem;
	}
</style>
