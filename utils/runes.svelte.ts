export class State<T = undefined> {
	state: T = $state() as T;
	private initial?: () => T;

	constructor(value?: T, initial?: () => T) {
		this.state = value as T;
		this.initial = initial;
	}

	reset() {
		if (this.initial) {
			this.state = this.initial();
		}
	}
}

export const effect = (callback: Parameters<typeof $effect>[0]) =>
	$effect.root(() => {
		$effect(callback);
	});
