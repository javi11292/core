<script lang="ts">
	import type { Snippet } from "svelte";
	import type { FocusEventHandler, MouseEventHandler } from "svelte/elements";
	import { Button } from "../button";
	import { Tooltip } from "../tooltip";
	import type { Element } from "./types";

	type Props = {
		elements: Element[];
		children: Snippet;
		disableScale?: boolean;
		disableHover?: boolean;
	};

	let { elements, children, disableScale, disableHover }: Props = $props();

	let show = $state(false);

	const handleClick =
		(callback?: (typeof elements)[number]["onclick"]): MouseEventHandler<HTMLButtonElement> =>
		(event) => {
			show = false;
			callback?.(event);
		};

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
</script>

<div
	class="menu"
	role="presentation"
	onmouseleave={disableHover ? undefined : () => (show = false)}
>
	<Tooltip {show}>
		<Button
			{disableScale}
			disableBackground={disableHover}
			onclick={() => (show = true)}
			onmouseenter={disableHover ? undefined : () => (show = true)}
			onblurcapture={handleBlur}
		>
			{@render children()}
		</Button>

		{#snippet tooltip()}
			<div bind:this={buttons}>
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
