<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import type { FocusEventHandler, MouseEventHandler } from "svelte/elements";
	import { Button } from "../button";
	import { Tooltip } from "../tooltip";

	type Props = {
		elements: (ComponentProps<typeof Button> & { label: string })[];
		right?: boolean;
		hover?: boolean;
		content?: Snippet;
	};

	let { elements, right, hover, content, ...props }: Props & ComponentProps<typeof Button> =
		$props();

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

	const handleShow = () => {
		if (hover) {
			return;
		}

		show = !show;
	};
</script>

<div class="menu" role="none">
	<Tooltip bind:show {hover} {right}>
		{#if content}
			<div class="content" role="none" onclick={handleShow} onblurcapture={handleBlur}>
				{@render content()}
			</div>
		{:else}
			<Button onclick={handleShow} onblurcapture={handleBlur} {...props} />
		{/if}

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
