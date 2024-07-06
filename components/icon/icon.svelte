<script lang="ts">
	type Icons =
		| "add"
		| "arrow-down"
		| "arrow-right"
		| "cart"
		| "close"
		| "delete"
		| "menu"
		| "person"
		| "remove";

	type Props = { icon: Icons; class?: string };

	let { icon }: Props = $props();
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon">
	<use href={`/assets/icons/${icon}.svg#icon`} />
</svg>

<style>
	@import "./icon.scss";
</style>
