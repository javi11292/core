<script lang="ts" context="module">
	export type Option = { label?: string; value: string };
</script>

<script lang="ts">
	import type { FocusEventHandler, MouseEventHandler } from "svelte/elements";
	import Button from "../button/button.svelte";
	import Input from "../input/input.svelte";
	import Tooltip from "../tooltip/tooltip.svelte";

	type Props = {
		options: Option[];
		label?: string;
		selected?: Option;
		disableShrink?: boolean;
	};

	let { options, label, selected, disableShrink }: Props = $props();

	let show = $state(false);
	let buttons: HTMLElement;

	const handleBlur: FocusEventHandler<HTMLElement> = ({ relatedTarget }) => {
		if (
			relatedTarget &&
			"parentElement" in relatedTarget &&
			relatedTarget.parentElement !== buttons
		) {
			show = false;
		}
	};

	const handleSelect = (option: Option) => () => {
		selected = option;
		show = false;
	};

	const handleClick: MouseEventHandler<HTMLElement> = ({ currentTarget }) => {
		show = !show;
		if (!show) {
			currentTarget.blur();
		}
	};
</script>

<div class="select">
	<Tooltip {show}>
		<Input
			readonly
			disableFocusLabel
			value={selected?.label}
			onblur={handleBlur}
			onclick={handleClick}
			{label}
			{disableShrink}
		/>

		{#snippet tooltip()}
			<div bind:this={buttons}>
				{#each options as option}
					<Button disableScale onclick={handleSelect(option)}>
						{option.label}
					</Button>
				{/each}
			</div>
		{/snippet}
	</Tooltip>
</div>

<style lang="scss">
	.select {
		display: contents;

		:global(.button) {
			text-transform: none;
			border-radius: unset;
		}
	}
</style>
