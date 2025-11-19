import { IComponent } from "../base/Model";

export interface IPage extends IComponent {
  setContent(content: HTMLElement): void;
}