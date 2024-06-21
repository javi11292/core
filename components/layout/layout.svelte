<script lang="ts">
	import { dev } from "$app/environment";
	import { onNavigate } from "$app/navigation";
	import type { Snippet } from "svelte";
	import "./layout.scss";

	type Props = { children: Snippet };

	let { children }: Props = $props();

	$effect(() => {
		if (!dev && "serviceWorker" in navigator) {
			navigator.serviceWorker.register("/service-worker.js").then((worker) => {
				console.log("WORKER LAST");
				if (!navigator.serviceWorker.controller) {
					console.log("FIRSTO TIMO");
					return;
				}

				worker.addEventListener("updatefound", () => {
					console.log("FOUND YOU");
					const { installing } = worker;

					console.log("INSTALLING", installing);

					installing?.addEventListener("statechange", () => {
						console.log("CHANGE", installing.state);
						if (installing.state === "installed") {
							location.reload();
						}
					});
				});
			});
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
