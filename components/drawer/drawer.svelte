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
		min-width: 50%;
		max-width: calc(100% - 5rem);

		&:not(.open) {
			translate: -100%;
		}
	}
</style>
