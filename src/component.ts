import { ComponentExtension } from './extensions';
import { mixin } from './utils/mixin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Component<T extends any = any> {
  public type: string;

  public constructor(typeT: new (...params: unknown[]) => T) {
    this.type = typeof typeT;
  }
}

export interface Component extends ComponentExtension {
  type: string;
}

mixin(Component, [ComponentExtension]);
