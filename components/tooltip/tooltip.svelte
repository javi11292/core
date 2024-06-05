<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicInOut } from "svelte/easing";

	type Props = {
		show?: boolean;
		children: Snippet;
		tooltip: Snippet;
	};

	let { children, tooltip, show }: Props = $props();

	const appear = (_node: HTMLDivElement) => ({
		duration: 150,
		easing: cubicInOut,
		css: (t: number) => `
      scale: ${t / 2 + 0.5};
      opacity: ${t};
    `,
	});
</script>

<span class="container" role="tooltip">
	{@render children()}

	{#if show}
		<div transition:appear class="tooltip">
			{@render tooltip()}
		</div>
	{/if}
</span>

<style lang="scss">
	.container {
		position: relative;
		z-index: 1;
	}

	.tooltip {
		position: absolute;
		width: 100%;
	}
</style>
