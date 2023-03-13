<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	export let options: string[] = [];
	export let selected: string = '';
	export let placeholder: string = '';

	const dispatch = createEventDispatcher();

	function onSelect(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;

		selected = target.innerText;
		target.blur();

		dispatch('select', selected);
	}
</script>

<div class="custom-select-wrapper center">
	<div class="custom-select">
		<div class="input-container flex center">
			<input readonly />
			<div class="value flex">{selected ? selected : placeholder ? placeholder : 'Select...'}</div>
			<div class="icon flex center">
				<Icon icon="expand_more" size="24px" />
			</div>
		</div>
		<div class="options-container">
			{#each options as option}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button
					class={`option ${selected.toLowerCase() === option.toLowerCase() ? 'selected' : ''}`}
					on:click={onSelect}
				>
					{option}
				</button>
			{/each}
		</div>
	</div>
</div>

<style scoped>
	.custom-select-wrapper {
		background: var(--boxes-color);
		padding: 1px;
		width: 100%;
		border-radius: 4px;
		color: var(--faint-color);
	}

	.custom-select-wrapper:focus-within {
		background: var(--gradient);
		color: var(--font-color);
		transition: 1s ease-in-out;
	}

	.custom-select {
		position: relative;
		background: var(--boxes-color);
		border-radius: 4px;
		height: 2.5rem;
		padding-left: 0.75rem;
		width: 100%;
	}

	.input-container {
		height: 100%;
		width: 100%;
		align-items: center;
	}

	.icon {
		padding-right: 0.25rem;
		padding-left: 0.5rem;
		justify-self: flex-end;
		width: 10%;
	}

	.value {
		width: 100%;
		height: 100%;
		align-items: center;
	}

	input {
		position: absolute;
		top: 0;
		left: 0;
		height: inherit;
		width: inherit;
		border: none;
		padding: 0;
		margin: 0;
		font-size: 1.2rem;
		opacity: 0;
	}

	.options-container {
		display: none;
		position: absolute;
		width: 100%;
		max-height: 500%;
		overflow-y: scroll;
		top: 110%;
		left: 0;
		background: var(--boxes-color);
		border-radius: 4px;
		height: 0;
	}

	.option {
		background: transparent;
		padding: 0.3rem 0.75rem;
		color: var(--faint-color);
		border: none;
		width: 100%;
		font-size: inherit;
		text-align: left;
	}

	.option:hover {
		background: var(--lines);
		cursor: pointer;
		transition: 0.3s;
	}

	.option.selected {
		background: var(--lines);
		color: var(--text-color);
	}

	.custom-select:focus-within .options-container {
		display: block;
		height: auto;
		animation: slideDown 0.2s ease-in-out;
	}

	@keyframes slideDown {
		0% {
			opacity: 0;
			transform: translateY(-10px);
			height: 0%;
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
