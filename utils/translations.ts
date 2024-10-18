import type keys from "$lib/locales/en.json";
import type { ServerLoad } from "@sveltejs/kit";
import { getContext } from "svelte";

const ACCEPT_LANGUAGE = /(.*?)(?:-.*?)?(?:[,|;](?:q=.*?,)?)/gi;

const urls = import.meta.glob<string>("$lib/locales/*.json", {
	eager: true,
	import: "default",
	query: "?url",
});

const locales = Object.entries(urls).reduce<Record<string, string>>((acc, [key, value]) => {
	acc[key.match(/(\w+).json/)![1]!] = value;
	return acc;
}, {}) as { en: string; [key: string]: string };

export const loadTranslations = async ({ fetch, request }: Parameters<ServerLoad>[0]) => {
	const matches = request.headers.get("accept-language")?.matchAll(ACCEPT_LANGUAGE) ?? [];

	let locale: string | undefined;

	for (const match of matches) {
		locale = match[1];

		if (locale && locales[locale]) {
			break;
		}
	}

	const url = locale && locales[locale];
	return await fetch(url ?? locales.en).then((response) => response.json());
};

export const getTranslate = () =>
	getContext<(key: keyof typeof keys, values?: Record<string, string>) => string>("translate");
