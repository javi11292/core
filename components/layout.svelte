<script lang="ts">
	import { browser, dev } from "$app/environment";
	import { onNavigate } from "$app/navigation";
	import type { Snippet } from "svelte";
	import island from "./island/island?url";
	import "./layout/global.scss";

	let { children }: { children: Snippet } = $props();

	if (browser && !dev && navigator.serviceWorker) {
		navigator.serviceWorker.register("/service-worker.js");
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<script defer type="module" src={island}></script>
</svelte:head>

{@render children()}
