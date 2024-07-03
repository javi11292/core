<script lang="ts">
	import type { Snippet } from "svelte";
	import type { AnimationEventHandler } from "svelte/elements";

	type Props = { open?: boolean; children: Snippet };

	let { open = $bindable(false), children }: Props = $props();

	const handleClick = (event: Event) => {
		if (event.target === dialog) {
			open = false;
		}
	};

	let dialog = $state<HTMLDialogElement>();
	let keepOpen = $state(false);

	const handleAnimation =
		(start: boolean): AnimationEventHandler<HTMLDialogElement> =>
		(event) => {
			if (!event.pseudoElement) {
				keepOpen = open || start;
			}
		};

	$effect(() => {
		dialog?.showModal();
	});
</script>

{#if open || keepOpen}
	<dialog
		bind:this={dialog}
		onclick={handleClick}
		class="dialog"
		class:reverse={!open}
		role="none"
		onanimationstart={handleAnimation(true)}
		onanimationend={handleAnimation(false)}
	>
		<div>
			{@render children()}
		</div>
	</dialog>
{/if}

<style>
	@import "./modal.scss";
</style>
