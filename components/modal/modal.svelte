<script lang="ts">
	import { classes } from "$lib/core/utils";
	import type { Snippet } from "svelte";
	import type { AnimationEventHandler } from "svelte/elements";
	import styles from "./modal.module.scss";

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
		class={classes(styles.dialog, !open && keepOpen && styles.reverse)}
		role="presentation"
		onanimationstart={handleAnimation(true)}
		onanimationend={handleAnimation(false)}
	>
		<div>
			{@render children()}
		</div>
	</dialog>
{/if}
