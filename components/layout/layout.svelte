<script lang="ts">
	import { dev } from "$app/environment";
	import { onNavigate } from "$app/navigation";
	import type { Snippet } from "svelte";
	import "./layout.scss";

	type Props = { children: Snippet };

	let { children }: Props = $props();

	$effect(() => {
		if (!dev && "serviceWorker" in navigator) {
			navigator.serviceWorker.register("/service-worker.js").then((registration) => {
				const reload = navigator.serviceWorker.controller;

				registration.addEventListener("updatefound", async () => {
					await caches.delete("Svelte");

					if (reload) {
						location.reload();
					}
				});
			});
		}
	});

	onNavigate(({ from, to, complete }) => {
		if (!document.startViewTransition) return;

		if (from?.url.href === to?.url.href) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await complete;
			});
		});
	});
</script>

{@render children()}
