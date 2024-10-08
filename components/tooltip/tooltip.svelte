<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicInOut } from "svelte/easing";

	type Props = {
		show?: boolean;
		children: Snippet;
		tooltip: Snippet;
		hover?: boolean;
		right?: boolean;
	};

	let { children, tooltip, show = $bindable(), hover, right }: Props = $props();

	const appear: (node: HTMLElement) => object = () => ({
		duration: 150,
		easing: cubicInOut,
		css: (t: number) => `
      scale: ${t / 2 + 0.5};
      opacity: ${t};
    `,
	});

	const handleHover = (value: boolean) => () => {
		if (hover) {
			show = value;
		}
	};
</script>

<span
	class="tooltip"
	role="tooltip"
	onmouseenter={handleHover(true)}
	onmouseleave={handleHover(false)}
>
	{@render children()}

	{#if show}
		<div transition:appear class="content" class:right>
			{@render tooltip()}
		</div>
	{/if}
</span>

<style>
	@import "./tooltip.scss";
</style>
