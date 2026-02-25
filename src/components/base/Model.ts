import { ChangeListener, IModel } from '../../types/base/Model';

export abstract class Model<T> implements IModel<T> {
	protected state: T;
	protected listeners = new Set<ChangeListener<T>>();

	constructor(initialState: T) {
		this.state = initialState;
	}

	getState(): T {
		return this.state;
	}

	setState(state: T): void {
		this.state = state;
		this.emitChange();
	}

	addChangeListener(cb: ChangeListener<T>): void {
		this.listeners.add(cb);
	}

	removeChangeListener(cb: ChangeListener<T>): void {
		this.listeners.delete(cb);
	}

	emitChange(): void {
		this.listeners.forEach((cb) => cb(this.state));
	}
}
