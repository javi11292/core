<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import { TRANSLATE } from "$lib/core/utils/translations";
	import { setContext, type Snippet } from "svelte";
	import "./setup.scss";

	const REPLACE_VALUE = /{(\w+)}/g;

	type Props = {
		translations?: Record<string, string>;
		children: Snippet;
	};

	let { translations = {}, children }: Props = $props();

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

	const translate = (key: string, values?: Record<string, string>) => {
		const translation = translations[key];

		if (translation && values) {
			return translation.replace(REPLACE_VALUE, (match, p1) => values[p1] ?? match);
		}

		return translation ?? "";
	};

	setContext(TRANSLATE, translate);
</script>

{@render children()}
