<script lang="ts">
	import type { Snippet } from "svelte";
	import { fade } from "svelte/transition";

	let { open = $bindable(), children }: { open: boolean; children: Snippet } = $props();
</script>

{#if open}
	<div
		role="presentation"
		onclick={() => (open = false)}
		class="backdrop"
		transition:fade={{ duration: 200 }}
	></div>
{/if}
<section class:open>
	{@render children()}
</section>

<style lang="scss">
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
	}

	section {
		background: white;
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		transition: translate 200ms;

		&:not(.open) {
			translate: -100%;
		}
	}
</style>
