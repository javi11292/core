import { tick } from "svelte";

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
