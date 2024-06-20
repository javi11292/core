<script lang="ts">
	import type { Snippet } from "svelte";
	import { fade } from "svelte/transition";

	let { open, onclose, children }: { open?: boolean; children: Snippet; onclose: () => void } =
		$props();
</script>

{#if open}
	<div
		role="presentation"
		onclick={onclose}
		class="backdrop"
		transition:fade={{ duration: 200 }}
	></div>
{/if}

<section class="section" class:open>
	{@render children()}
</section>

<style>
	@import "./drawer.scss";
</style>
