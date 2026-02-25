import { IEvents } from './events';

export class TypedEvents<Events extends Record<string, any>> {
	constructor(private emitter: IEvents) {}

	on<K extends keyof Events>(event: K, cb: (data: Events[K]) => void) {
		this.emitter.on(event as string, cb as any);
	}

	emit<K extends keyof Events>(event: K, data: Events[K]) {
		this.emitter.emit(event as string, data);
	}
}
