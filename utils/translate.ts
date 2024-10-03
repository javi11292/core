import { State } from "./runes.svelte";

const translations = new State<Record<string, string>>();

export const translate = (key: string) => translations.state[key] ?? "";

export const loadTranslations = async (locales: string[]) => {
	let locale: string | undefined;

	for (let i = 0; i < navigator.languages.length; i++) {
		locale = navigator.languages[i]?.match(/([^-]+)/)?.[1];

		if (locale && locales.includes(locale)) {
			break;
		}
	}

	translations.state = await fetch(`/locales/${locale ?? locales[0]}.json`).then((response) =>
		response.json(),
	);
};
