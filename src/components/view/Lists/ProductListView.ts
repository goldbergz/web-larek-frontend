import { IProductListView } from '../../../types/view/Lists/ProductList';
import { List } from './List';

export class ProductListView extends List implements IProductListView {
	constructor(container: HTMLElement) {
		super(container);
	}

	setElements(elements: HTMLElement[]): void {
		this.update(elements);
	}
}
