import { IList } from "../../../types/base/View";
import { DataView } from '../../base/View';

export abstract class List<T>
  extends DataView<T[]>
  implements IList<T>
{
  
  items: T[] = [];
  protected itemClickCb?: (item: T, index: number) => void;

  constructor(container: HTMLElement) {
    super(container);
  }

  setItems(items: T[]): void {
    this.items = items;
    this.render();
  }

  getItems(): T[] {
    return this.items;
  }

  onItemClick?(callback: (item: T, index: number) => void): void {
    this.itemClickCb = callback;
  }

  update(data: Partial<T[]>): HTMLElement {
    if (data) this.items = data as T[];
    return this.render();
  }

  render(): HTMLElement {
    this.element.innerHTML = '';
    this.items.forEach((item, index) => {
      const el = this.renderItem(item, index);
      el.addEventListener('click', () => {
        if (this.itemClickCb) this.itemClickCb(item, index);
      });
      this.element.appendChild(el);
    });
    return this.element;
  }

    protected abstract renderItem(item: T, index: number): HTMLElement;
}

