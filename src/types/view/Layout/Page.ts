import { IView } from '../../base/View';

export interface IPage extends IView {
	setContent(content: HTMLElement): void;
}
