<script lang="ts" module>
	class Store {
		web = $state<boolean>();
	}

	const store = new Store();

	if (browser) {
		const mediaQuery = matchMedia("(min-width: 60em)");

		store.web = mediaQuery.matches;

		mediaQuery.addEventListener("change", ({ matches }) => {
			store.web = matches;
		});
	}
</script>

<script lang="ts">
	import { browser } from "$app/environment";
	import type { Snippet } from "svelte";

	type Props = { children: Snippet } & ({ web?: false; app: true } | { web: true; app?: false });

	let { children, web = false, app = false }: Props = $props();
</script>

{#if store.web === undefined || store.web === web}
	<div class:web class:app>
		{@render children()}
	</div>
{/if}

<style>
	@import "./visible.scss";
</style>
