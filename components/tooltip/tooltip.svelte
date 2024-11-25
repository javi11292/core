<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicInOut } from "svelte/easing";

	type Props = {
		show?: boolean;
		children: Snippet;
		tooltip: Snippet;
		hover?: boolean;
	};

	let { children, tooltip, show = $bindable(), hover }: Props = $props();

	let element = $state<HTMLElement>();

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

	$effect(() => {
		if (element) {
			const size = element.getBoundingClientRect();
			const viewport = document.documentElement.getBoundingClientRect();
			const diff = viewport.right - size.right;

			if (diff < 0) {
				element.style.left = `${viewport.right - size.right}px`;
			} else {
				element.style.left = "0";
			}
		}
	});
</script>

<span
	class="tooltip"
	role="tooltip"
	onmouseenter={handleHover(true)}
	onmouseleave={handleHover(false)}
>
	{@render children()}

	{#if show}
		<div transition:appear class="content" bind:this={element}>
			{@render tooltip()}
		</div>
	{/if}
</span>

<style>
	@import "./tooltip.scss";
</style>
