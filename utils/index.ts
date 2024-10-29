import { getContext, setContext, tick } from "svelte";

export const transition = (callback: () => void) => {
	if (!document.startViewTransition) {
		callback();
		return;
	}

	document.startViewTransition(async () => {
		callback();
		await tick();
	});
};

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

export const setupContext = <T>() => {
	const STORE = Symbol();

	return [() => getContext<T>(STORE), (data: T) => setContext(STORE, data)] as const;
};

export function assert(condition: unknown): asserts condition {
	if (!condition) {
		throw new Error();
	}
}
