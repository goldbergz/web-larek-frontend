import { IList } from '../../../types/base/View';
import { DataView } from '../../base/View';

export abstract class List extends DataView<HTMLElement[]> implements IList  {

	constructor(container: HTMLElement) {
		super(container);
	}

	update(elements: Partial<HTMLElement[]>): HTMLElement {
    this.element.innerHTML = '';
    (elements as HTMLElement[]).forEach((el) => {
      this.element.appendChild(el);
    });
    return this.element;
  }

  render(): HTMLElement {
    return this.element;
  }
}
