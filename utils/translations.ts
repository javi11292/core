import type keys from "$lib/locales/en.json";
import type { ServerLoad } from "@sveltejs/kit";
import { setupContext } from ".";

const ACCEPT_LANGUAGE = /(.*?)(?:-.*?)?(?:[,|;](?:q=.*?,)?)/gi;

const urls = import.meta.glob<string>("$lib/locales/*.json", {
	eager: true,
	import: "default",
	query: "?url",
});

const locales = Object.entries(urls).reduce<Record<string, string>>((acc, [key, value]) => {
	const [, match] = key.match(/(\w+).json/) ?? [];
	acc[match!] = value;

	return acc;
}, {}) as { en: string; [key: string]: string };

export const loadTranslations = async ({ fetch, request }: Parameters<ServerLoad>[0]) => {
	const matches = request.headers.get("accept-language")?.matchAll(ACCEPT_LANGUAGE) ?? [];

	let locale: string | undefined;

	for (const [, match] of matches) {
		locale = match && locales[match.toLowerCase()];

		if (locale) {
			break;
		}
	}

	return await fetch(locale || locales.en).then((response) => response.json());
};

export const [getTranslate, setTranslate] =
	setupContext<(key: keyof typeof keys, values?: Record<string, string>) => string>();
