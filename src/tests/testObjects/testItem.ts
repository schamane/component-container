import { Component } from '../../component';
import { get, set } from '../../utils/object';

export interface TestItemType {
  name: string;
  order: number;
  optional?: boolean;
}

export class TestItem<T extends TestItemType = TestItemType> extends Component {
  protected props: T;

  public constructor(item?: T) {
    super(TestItem);
    this.props = item || ({ name: undefined, order: 0 } as T);
  }

  public getProps(): T {
    return this.props;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get<T extends any = any>(key: keyof TestItemType): T {
    return get(this.props, key, null);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set(key: keyof TestItemType, value: any): void {
    set(this.props, key, value);
  }
}
