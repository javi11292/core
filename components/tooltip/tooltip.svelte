<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicInOut } from "svelte/easing";
	import styles from "./tooltip.module.scss";

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

<span class={styles.container} role="tooltip">
	{@render children()}

	{#if show}
		<div transition:appear class={styles.tooltip}>
			{@render tooltip()}
		</div>
	{/if}
</span>
