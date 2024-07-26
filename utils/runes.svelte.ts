export class State<T = undefined> {
	state: T = $state() as T;
	private initialValue?: () => T;

	constructor(value?: T, initialValue?: () => T) {
		this.state = value as T;
		this.initialValue = initialValue;
	}

	reset() {
		if (this.initialValue) {
			this.state = this.initialValue();
		}
	}
}
