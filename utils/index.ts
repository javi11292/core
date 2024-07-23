export * from "./fetch";
export * from "./runes.svelte";
export * from "./transition";

export const dynamic =
	<T>(callback: () => Promise<{ default: T }>) =>
	async () => {
		const component = await callback();

		return component.default;
	};
