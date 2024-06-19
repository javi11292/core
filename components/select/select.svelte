<script lang="ts">
	import type { FocusEventHandler, MouseEventHandler } from "svelte/elements";
	import { Button } from "../button";
	import { Icon, icons } from "../icon";
	import { Input } from "../input";
	import { Tooltip } from "../tooltip";
	import styles from "./select.module.scss";
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

<Tooltip class="select" {show}>
	<Input
		readonly
		disableFocusLabel
		value={selected?.label || ""}
		onblur={handleBlur}
		onclick={handleClick}
		class={styles.input}
		{label}
	>
		{#snippet icon()}
			<Icon class={styles.icon} icon={icons.arrowDown} />
		{/snippet}
	</Input>

	{#snippet tooltip()}
		<div bind:this={buttons}>
			{#each options as option}
				<Button class={styles.button} disableScale onclick={handleSelect(option)}>
					{option.label}
				</Button>
			{/each}
		</div>
	{/snippet}
</Tooltip>
