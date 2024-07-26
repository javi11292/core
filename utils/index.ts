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
	let lastArgs: T | undefined;
	let result: R;

	return (...args: T) => {
		if (
			lastArgs?.length === args.length &&
			lastArgs.every((arg, index) => arg === args[index]) &&
			!expired?.(result)
		) {
			return result;
		}

		lastArgs = args;
		result = callback(...args);

		return result;
	};
};
