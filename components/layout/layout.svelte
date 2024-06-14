<script lang="ts">
	import { dev } from "$app/environment";
	import { onNavigate } from "$app/navigation";
	import type { Snippet } from "svelte";
	import "./global.scss";

	type Props = { children: Snippet };

	let { children }: Props = $props();

	$effect(() => {
		if (!dev && "serviceWorker" in navigator) {
			navigator.serviceWorker.register("/service-worker.js");
		}
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		if (navigation.from?.url.href === navigation.to?.url.href) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

{@render children()}
