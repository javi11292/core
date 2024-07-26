export class State<T = undefined> {
	value: T = $state() as T;
	private initialValue?: () => T;

	constructor(value?: T, initialValue?: () => T) {
		this.value = value as T;
		this.initialValue = initialValue;
	}

	reset() {
		if (this.initialValue) {
			this.value = this.initialValue();
		}
	}
}
