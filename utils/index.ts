export * from "./fetch";
export * from "./transition";

export const dynamic = (callback: () => Promise<{ default: unknown }>) => async () => {
	const component = await callback();

	return component.default;
};
