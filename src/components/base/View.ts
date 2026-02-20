import { IDataView, IView } from "../../types/base/View";
import { Component } from "../view/Component";

export abstract class View
  extends Component
  implements IView
{
  abstract render(): HTMLElement;
}

export abstract class DataView<T> extends View implements IDataView<T> {
  abstract update(data: Partial<T>): HTMLElement;
}