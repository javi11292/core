<script lang="ts">
	type Props = { icon: string; mirror?: boolean };

	let { icon, mirror }: Props = $props();
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon" class:mirror>
	<use href={`${icon}#icon`} />
</svg>

<style>
	@import "./icon.scss";
</style>
