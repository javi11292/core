<script lang="ts">
	import type { Snippet } from "svelte";
	import { Modal } from "../modal";

	type Props = {
		children: Snippet;
		buttons: Snippet<[() => void]>;
		onclose: () => void;
	};

	let { children, buttons, onclose }: Props = $props();
	let open = $state(true);
</script>

<Modal {open} {onclose}>
	<div class="container">
		{@render children()}

		<div class="buttons">
			{@render buttons(() => (open = false))}
		</div>
	</div>
</Modal>

<style>
	@import "./confirmation.scss";
</style>
