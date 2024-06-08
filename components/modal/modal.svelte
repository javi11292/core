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
		class:reverse={!open && keepOpen}
		role="presentation"
		onanimationstart={handleAnimation(true)}
		onanimationend={handleAnimation(false)}
	>
		<div>
			{@render children()}
		</div>
	</dialog>
{/if}

<style lang="scss">
	::backdrop {
		background: rgba(0, 0, 0, 0.8);
	}

	.reverse {
		animation: disappear 200ms forwards;
	}

	.reverse::backdrop {
		animation: fadeOut 200ms forwards;
	}

	dialog {
		animation: appear 200ms;
		border: none;
		border-radius: 0.4rem;
		box-shadow: 0 0.4rem 0.6rem black;
		max-width: 90vw;
		max-height: 90vh;
		padding: 0;
		overflow: hidden;
		margin: auto;

		div {
			overflow: auto;
		}
	}

	dialog::backdrop {
		animation: fadeIn 200ms;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes appear {
		from {
			opacity: 0;
			scale: 0;
			display: none;
		}

		to {
			opacity: 1;
			scale: 1;
			display: block;
		}
	}

	@keyframes disappear {
		from {
			opacity: 1;
			scale: 1;
			display: block;
		}

		to {
			opacity: 0;
			scale: 0;
			display: none;
		}
	}
</style>
