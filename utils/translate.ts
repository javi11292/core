import type keys from "$lib/locales/en.json";
import type { Load } from "@sveltejs/kit";
import { State } from "./runes.svelte";

const translations = new State<Record<keyof typeof keys, string>>();

export const translate = (key: keyof typeof keys) => translations.state[key] ?? "";

export const loadTranslations =
	(locales: string[]): Load =>
	async ({ fetch }) => {
		let locale: string | undefined;

		for (let i = 0; i < navigator.languages.length; i++) {
			locale = navigator.languages[i]?.match(/([^-]+)/)?.[1];

			if (locale && locales.includes(locale)) {
				break;
			}
		}

		const { default: url } = await import(`$lib/locales/${locale ?? locales[0]}.json?url`);
		translations.state = await fetch(url).then((response) => response.json());
	};
