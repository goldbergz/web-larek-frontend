import { IComponent } from "../../base/Base";

export interface IPage extends IComponent {
  setContent(content: HTMLElement): void;
}