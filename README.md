# Container and component typescript library

create your container with components

## How to use

```
npm install @schamane/component-container
```

Start using package in your code like that

```ts
import { Container } from '@schamane/component-container';

const cont =  new Container();
console.log(cont.getAllComponents());
```

## Documentation

Use Component as base class to extend it for own needs. As example create container for holding string.

```ts
import { Component } from '@schamane/component-container';

export class StringComponent<T extends string> extends Component {
  protected prop: T;

  public constructor(item?: T) {
    super(StringComponent);
    this.prop = item || undefined;
  }

  public get(): T {
    return this.prop;
  }

  public set(value: T): void {
    this.prop = value;
  }
}
```

Now create Container

```ts
import { Container } from '@schamane/component-container';
import { StringComponent } from './stringComponent';

const cont =  new Container();
cont.addComponent(new StringComponent('testItem1'));
cont.addComponent(new StringComponent('testItem2'));

console.log(cont.getAllComponents());
```

Now you can create one more complex container. Add it to your container. Than you can use getComponent and getComponents.

```ts
console.log(cont.getComponent(StringComponent));
```

This will returns you first found component from container by Type.
