import { IEvents } from './events';

export class TypedEvents<Events> {
	constructor(private emitter: IEvents) {}

	on<K extends keyof Events & string>(event: K, cb: (data: Events[K]) => void) {
		this.emitter.on(event, cb as (data: object) => void);
	}

	emit<K extends keyof Events & string>(event: K, data: Events[K]) {
		this.emitter.emit(event, data as object);
	}
}