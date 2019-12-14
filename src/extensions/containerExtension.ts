import { Component, Container } from '..';
import { ComponentType } from './componentExtension';

export class ContainerExtension {
  protected components: Component[] = [];

  public getAllComponents(): Component[] {
    return this.components;
  }

  public getComponents<T extends Component>(typeT: ComponentType<T>): T[] {
    return this.getAllComponents().filter((item) => item instanceof typeT) as T[];
  }

  public getComponent<T extends Component>(typeT: ComponentType<T>): T {
    return this.getAllComponents().find((item) => item instanceof typeT) as T;
  }

  public addComponent<T extends Component>(component: T): Container {
    this.components.push(component);
    return (this as unknown) as Container;
  }

  public removeComponent<T extends Component>(component: T): Container {
    this.components = this.components.filter((comp) => comp !== component);
    return (this as unknown) as Container;
  }

  public clearComponents(): Container {
    this.getAllComponents().forEach((component: Component): void => component.dispose && component.dispose());
    this.components = [];
    return (this as unknown) as Container;
  }

  public dispose(): void {
    this.clearComponents();
    delete this.components;
  }
}
