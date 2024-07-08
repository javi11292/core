<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicInOut } from "svelte/easing";

	type Props = {
		show?: boolean;
		children: Snippet;
		tooltip: Snippet;
		hover?: boolean;
	};

	let { children, tooltip, show, hover }: Props = $props();
	let hoverShow = $state(false);

	const appear = (_node: HTMLDivElement) => ({
		duration: 150,
		easing: cubicInOut,
		css: (t: number) => `
      scale: ${t / 2 + 0.5};
      opacity: ${t};
    `,
	});
</script>

<span
	class="tooltip"
	role="tooltip"
	onmouseenter={() => (hoverShow = true)}
	onmouseleave={() => (hoverShow = false)}
>
	{@render children()}

	{#if show || (hover && hoverShow)}
		<div transition:appear class="content">
			{@render tooltip()}
		</div>
	{/if}
</span>

<style>
	@import "./tooltip.scss";
</style>
