import { Component, Container } from '..';

export type ComponentType<T extends Component> = new (...params: unknown[]) => T;

export class ComponentExtension {
  protected container: Container;

  private getAllComponents(): Component[] {
    return this.container.getAllComponents();
  }

  protected getComponents<T extends Component>(typeT: ComponentType<T>): T[] {
    return this.getAllComponents().filter((item) => item instanceof typeT) as T[];
  }

  protected getComponent<T extends Component>(typeT: ComponentType<T>): T {
    return this.getAllComponents().find((item) => item instanceof typeT) as T;
  }
}
