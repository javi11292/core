<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { children: Snippet } & ({ web?: false; app: true } | { web: true; app?: false });

	let { children, web, app }: Props = $props();
</script>

<div class:web class:app>
	{@render children()}
</div>

<style>
	@import "./visible.scss";
</style>
