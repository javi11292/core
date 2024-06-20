<script lang="ts">
	import type { FocusEventHandler, MouseEventHandler } from "svelte/elements";
	import { Button } from "../button";
	import { Icon, icons } from "../icon";
	import { Input } from "../input";
	import { Tooltip } from "../tooltip";
	import type { Option } from "./types";

	type Props = {
		options: Option[];
		label?: string;
		selected?: Option;
	};

	let { options, label, selected = $bindable() }: Props = $props();

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
			value={selected?.label || ""}
			onblur={handleBlur}
			onclick={handleClick}
			{label}
		>
			{#snippet icon()}
				<Icon icon={icons.arrowDown} />
			{/snippet}
		</Input>

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

<style>
	@import "./select.scss";
</style>
