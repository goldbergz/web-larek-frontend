export type ChangeListener<T> = (state: T) => void;

export interface IModel<T> {
	getState(): T;
	setState(newState: T): void;
	addChangeListener(listener: ChangeListener<T>): void;
	removeChangeListener(listener: ChangeListener<T>): void;
	emitChange(): void;
}
