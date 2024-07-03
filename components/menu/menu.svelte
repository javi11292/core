<script lang="ts">
	import type { ComponentProps } from "svelte";
	import type { FocusEventHandler, MouseEventHandler } from "svelte/elements";
	import { Button } from "../button";
	import { Tooltip } from "../tooltip";
	import type { Element } from "./types";

	type Props = {
		elements: Element[];
		right?: boolean;
	};

	let { elements, right, ...props }: Props & ComponentProps<Button> = $props();

	let show = $state(false);

	const handleClick =
		(callback?: (typeof elements)[number]["onclick"]): MouseEventHandler<HTMLButtonElement> =>
		async (event) => {
			await callback?.(event);
			show = false;
		};

	let buttons: HTMLElement;

	const handleBlur: FocusEventHandler<HTMLElement> = ({ relatedTarget }) => {
		if (
			!relatedTarget ||
			("parentElement" in relatedTarget && relatedTarget.parentElement !== buttons)
		) {
			show = false;
		}
	};
</script>

<div class="menu" role="none" class:right>
	<Tooltip {show}>
		<Button onclick={() => (show = !show)} onblurcapture={handleBlur} {...props} />

		{#snippet tooltip()}
			<div class="buttons" bind:this={buttons}>
				{#each elements as { label, onclick, ...props }}
					<Button disableScale onclick={handleClick(onclick)} {...props}>
						{label}
					</Button>
				{/each}
			</div>
		{/snippet}
	</Tooltip>
</div>

<style>
	@import "./menu.scss";
</style>
