<script lang="ts">
	import type { Snippet } from "svelte";
	import type { AnimationEventHandler } from "svelte/elements";
	import { Button } from "../button";
	import { icons } from "../icon";

	type Props = { open?: boolean; children: Snippet; closeButton?: boolean };

	let { open = $bindable(false), children, closeButton }: Props = $props();

	let dialog = $state<HTMLDialogElement>();
	let keepOpen = $state(false);

	const handleClick = (event: Event) => {
		if (event.target === dialog) {
			open = false;
		}
	};

	const handleCancel = (event: Event) => {
		event.preventDefault();
		open = false;
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
</script>

{#if open || keepOpen}
	<dialog
		bind:this={dialog}
		onclick={handleClick}
		oncancel={handleCancel}
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
					<Button text icon={icons.close} onclick={() => (open = false)} />
				</div>
			{/if}
		</div>
	</dialog>
{/if}

<style>
	@import "./modal.scss";
</style>
