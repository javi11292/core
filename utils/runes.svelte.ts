export class State<T = undefined> {
	state: T = $state() as T;
	private initial?: () => T;

	static create<T = undefined>(value?: T, initial?: () => T) {
		let store: State<T>;

		return {
			create: () => {
				store = new State(value, initial);
			},

			get state() {
				return store.state;
			},

			set state(value: T) {
				store.state = value;
			},

			get reset() {
				return () => store.reset();
			},
		};
	}

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
