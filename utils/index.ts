export * from "./fetch";
export * from "./runes.svelte";
export * from "./transition";

export const dynamic =
	<T>(callback: () => Promise<{ default: T }>) =>
	async () => {
		const component = await callback();

		return component.default;
	};

export const memo = <T extends unknown[], R>(
	callback: (...args: T) => R,
	expired?: (value: R) => boolean,
) => {
	let executed = false;
	let result: R;

	return (...args: T) => {
		if (executed && !expired?.(result)) {
			return result;
		}

		executed = true;
		result = callback(...args);

		return result;
	};
};
