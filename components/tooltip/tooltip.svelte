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

<span class="tooltip" role="tooltip">
	{@render children()}

	{#if show}
		<div transition:appear class="content">
			{@render tooltip()}
		</div>
	{/if}
</span>

<style>
	@import "./tooltip.scss";
</style>
