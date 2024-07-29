export class State<T = undefined> {
	state: T = $state() as T;

	constructor(value?: T) {
		this.state = value as T;
	}
}

export const effect = (callback: Parameters<typeof $effect>[0]) =>
	$effect.root(() => {
		$effect(callback);
	});
