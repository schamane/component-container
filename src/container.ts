import { ContainerExtension } from './extensions';
import { mixin } from './utils/mixin';
import { Component } from './component';

export class Container<T extends Component[] = Component[]> {
  protected components = [] as T;

  public toString(): string {
    return `Container::${this.components}`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Container extends ContainerExtension {}
mixin(Container, [ContainerExtension]);
