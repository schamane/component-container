import { Component, Container } from '..';

export class ComponentExtension {
  protected container: Container;

  private getAllComponents(): Component[] {
    return this.container.getAllComponents();
  }

  protected getComponents<T extends Component>(typeT: new (...params: unknown[]) => T): T[] {
    return this.getAllComponents().filter((item) => item instanceof typeT) as T[];
  }

  protected getComponent<T extends Component>(typeT: new (...params: unknown[]) => T): T {
    return this.getAllComponents().find((item) => item instanceof typeT) as T;
  }
}
