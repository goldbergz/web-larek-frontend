import { IView } from "../../base/View";

export interface IPagew extends IView {
  setContent(content: HTMLElement): void;
}