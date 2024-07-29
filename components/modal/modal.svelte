<script lang="ts">
	import type { Snippet } from "svelte";
	import type { AnimationEventHandler } from "svelte/elements";
	import { Button } from "../button";

	type Props = {
		open?: boolean;
		children: Snippet;
		closeButton?: boolean;
		preventCancel?: boolean;
	};

	let { open = $bindable(false), children, closeButton, preventCancel }: Props = $props();

	let dialog = $state<HTMLDialogElement>();
	let keepOpen = $state(false);

	const handleClick = (event: Event) => {
		if (event.target === dialog) {
			open = false;
		}
	};

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

	$effect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") {
				return;
			}

			event.preventDefault();

			if (preventCancel) {
				return;
			}

			open = false;
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
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
			{#if closeButton}
				<div class="close">
					<Button text icon="close" onclick={() => (open = false)} />
				</div>
			{/if}
		</div>
	</dialog>
{/if}

<style>
	@import "./modal.scss";
</style>
