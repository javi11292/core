<script lang="ts">
	type Props = { icon: string; class?: string };

	let { icon }: Props = $props();
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon">
	<use href={`${icon}#icon`} />
</svg>

<style>
	@import "./icon.scss";
</style>
