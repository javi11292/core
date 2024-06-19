<script lang="ts">
	import type { Snippet } from "svelte";
	import { fade } from "svelte/transition";
	import styles from "./drawer.module.scss";

	let { open, onclose, children }: { open?: boolean; children: Snippet; onclose: () => void } =
		$props();
</script>

{#if open}
	<div
		role="presentation"
		onclick={onclose}
		class={styles.backdrop}
		transition:fade={{ duration: 200 }}
	></div>
{/if}

<section class={styles.section} class:open>
	{@render children()}
</section>
