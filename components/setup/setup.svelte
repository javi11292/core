<script lang="ts" module>
	let viewTransition = true;

	export const disableViewTransition = () => (viewTransition = false);
</script>

<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import { setTranslate } from "$core/utils/translations";
	import { type Snippet } from "svelte";
	import "./setup.scss";

	const REPLACE_VALUE = /{(\w+)}/g;

	type Props = {
		translations?: Record<string, string>;
		children: Snippet;
	};

	let { translations = {}, children }: Props = $props();

	onNavigate(({ from, to, complete }) => {
		if (!document.startViewTransition || from?.url.href === to?.url.href) {
			return;
		}

		if (!viewTransition) {
			viewTransition = true;
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await complete;
			});
		});
	});

	setTranslate((key, values) => {
		const translation = translations[key];

		if (translation && values) {
			return translation.replace(REPLACE_VALUE, (match, p1) => values[p1] ?? match);
		}

		return translation ?? "";
	});

	$effect(() => {
		const controller = new AbortController();

		document.addEventListener("dragstart", (event) => event.preventDefault(), {
			signal: controller.signal,
		});

		return () => controller.abort();
	});
</script>

{@render children()}
