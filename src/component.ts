/* eslint-disable no-underscore-dangle */
import { ComponentExtension } from './extensions';
import { mixin } from './utils/mixin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Component<T extends any = any> {
  private _type: string;

  public constructor(typeT?: new (...params: unknown[]) => T) {
    this._type = typeT?.name;
  }

  public getType(): string {
    return this._type || 'any';
  }

  public dispose(): void {
    delete this._type;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Component extends ComponentExtension {}

mixin(Component, [ComponentExtension]);
