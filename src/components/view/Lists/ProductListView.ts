import { IProduct } from '../../../types/base/DataTypes';
import { IProductListView } from '../../../types/view/Lists/ProductList';
import { ProductCardView } from '../ProductView/ProductCardView';
import { List } from './List';

export class ProductListView
  extends List<IProduct>
  implements IProductListView
{
	constructor(container: HTMLElement, private template: HTMLTemplateElement) {
		super(container);
	}

	protected renderItem(product: IProduct): HTMLElement {
		const card = new ProductCardView(this.template);
		card.setProduct(product);
		return card.element;
	}

	onProductClick(callback: (product: IProduct) => void): void {
		this.onItemClick((item) => callback(item));
	}
}
