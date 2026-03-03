import { IBasketListView } from '../../../types/view/Lists/BasketList';
import { List } from './List';

export class BasketListView extends List implements IBasketListView {
	constructor(container: HTMLElement) {
		super(container);
	}

	setElements(elements: HTMLElement[]): void {
		this.update(elements);
	}
}
