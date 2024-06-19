<script lang="ts">
	import { classes } from "$lib/core/utils";
	import type { Snippet } from "svelte";
	import { cubicInOut } from "svelte/easing";
	import styles from "./tooltip.module.scss";

	type Props = {
		show?: boolean;
		children: Snippet;
		tooltip: Snippet;
		class?: string;
	};

	let { children, tooltip, show, class: className }: Props = $props();

	const appear = (_node: HTMLDivElement) => ({
		duration: 150,
		easing: cubicInOut,
		css: (t: number) => `
      scale: ${t / 2 + 0.5};
      opacity: ${t};
    `,
	});
</script>

<span class={classes(styles.container, className)} role="tooltip">
	{@render children()}

	{#if show}
		<div transition:appear class={styles.tooltip}>
			{@render tooltip()}
		</div>
	{/if}
</span>
