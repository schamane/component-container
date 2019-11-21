import { Component } from '../../component';

export class TestString<T extends string = string> extends Component {
  protected prop: T;

  public constructor(item?: T) {
    super();
    this.prop = item || undefined;
  }

  public get(): T {
    return this.prop;
  }

  public set(value: T): void {
    this.prop = value;
  }
}
