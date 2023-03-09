<script lang="ts">
	import { createEventDispatcher } from "svelte";


	let className: string = undefined;
	export { className as class };
	export let name: string = undefined;
	export let type: "text" | "password" = "text";
	export let placeholder: string = undefined;
	export let autocomplete: "off" | "on" = "off";


	const dispatch = createEventDispatcher();

	let input: HTMLInputElement;

	function emit(event: string) {
		return () => dispatch(event, input.value);
	}
</script>

<div class={`${className} custom-input`}>
	<div class="input-wrapper">
		<input
			bind:this={input}
			{name}
			{type}
			{placeholder}
			{autocomplete}
			on:change={emit("change")}
			on:input={emit('input')}
		/>
	</div>
</div>

<style scoped>
	.custom-input {
		height: 1.5em;
		padding: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.input-wrapper {
		border-bottom: 1px solid var(--faint-color);
	}

	.input-wrapper:has(input:focus) {
		border-bottom: 2px solid var(--hover-color);
	}

	input {
		color: var(--faint-color);
		background: transparent;
		border: none;
		font-size: inherit;
	}

	input:focus {
		outline: none;
		color: var(--text-color);
	}

	input::placeholder {
		color: var(--faint-color);
	}
</style>