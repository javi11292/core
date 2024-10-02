<script lang="ts">
	import type { Snippet } from "svelte";
	import { Button } from "../button";

	type Props = {
		open?: boolean;
		children: Snippet;
		closeButton?: boolean;
		preventCancel?: boolean;
		onClose?: () => void;
	};

	let { open = $bindable(false), onClose, children, closeButton, preventCancel }: Props = $props();

	let dialog: HTMLDialogElement;

	const handleClick = (event: Event) => {
		if (event.target === dialog && !preventCancel) {
			open = false;
		}
	};

	const handleAnimationEnd = (event: AnimationEvent) => {
		if (!open && !event.pseudoElement) {
			dialog.close();
			onClose?.();
		}
	};

	$effect(() => {
		if (open) {
			dialog.showModal();
		}
	});

	$effect(() => {
		if (!open) {
			return;
		}

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

<dialog
	bind:this={dialog}
	onclick={handleClick}
	class="dialog"
	class:open
	role="none"
	onanimationend={handleAnimationEnd}
>
	<div class="content">
		{@render children()}
		{#if closeButton}
			<div class="close">
				<Button text icon="close" onclick={() => (open = false)} />
			</div>
		{/if}
	</div>
</dialog>

<style>
	@import "./modal.scss";
</style>
