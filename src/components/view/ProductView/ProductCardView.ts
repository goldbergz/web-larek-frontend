import { IProduct } from "../../../types/base/DataTypes";
import { IDataView } from "../../../types/base/View";
import { CDN_URL } from "../../../utils/constants";
import { Component } from "../Component";

export class ProductCardView
  extends Component
  implements IDataView<IProduct> {
  
  private product!: IProduct;

  constructor(template: HTMLTemplateElement) {
    const element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    super(element);
  }
  render(): HTMLElement {
    throw new Error("Method not implemented.");
  }

  setProduct(product: IProduct): void {
    this.product = product;
    this.update(product);
  }

  update(data: Partial<IProduct>): HTMLElement {
    const category = this.element.querySelector('.card__category')!;
    const title = this.element.querySelector('.card__title')!;
    const image = this.element.querySelector('.card__image') as HTMLImageElement;
    const price = this.element.querySelector('.card__price')!;

    if (data.category) category.textContent = data.category;
    if (data.title) title.textContent = data.title;
    if (data.image) {
        image.src = data.image.startsWith('/')
            ? `${CDN_URL}${data.image}`
            : data.image;
    }
    
        if (data.price !== undefined && data.price !== null) {
      price.textContent = `${data.price} синапсов`;
    } else {
      price.textContent = 'Бесценно';
    }


    return this.element;
  }

  getId(): string {
    return this.product.id;
  }
  
  getProduct(): IProduct {
    return this.product;
  }
}