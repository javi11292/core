export class State<T = undefined> {
	value: T = $state() as T;

	constructor(value?: T) {
		this.value = value as T;
	}
}
