import type keys from "$lib/locales/en.json";
import type { Load } from "@sveltejs/kit";
import { State } from "./runes.svelte";

const urls = import.meta.glob<string>("$lib/locales/*.json", {
	eager: true,
	import: "default",
	query: "?url",
});

const locales = Object.entries(urls).reduce<Record<string, string>>((acc, [key, value]) => {
	acc[key.match(/(\w+).json/)![1]!] = value;
	return acc;
}, {}) as { en: string; [key: string]: string };

const translations = new State<Record<keyof typeof keys, string>>();

export const translate = (key: keyof typeof keys) => translations.state[key] ?? "";

export const loadTranslations =
	(languages: string[]): Load =>
	async ({ fetch }) => {
		let language: string | undefined;

		for (let i = 0; i < navigator.languages.length; i++) {
			language = navigator.languages[i]?.match(/([^-]+)/)?.[1];

			if (language && languages.includes(language)) {
				break;
			}
		}

		const url = language && locales[language];
		translations.state = await fetch(url ?? locales.en).then((response) => response.json());
	};
