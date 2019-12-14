import 'mocha';
import { expect } from 'chai';
import { Container } from '../container';
import { TestItem } from './testObjects/testItem';
import { TestString } from './testObjects/testString';

const testItem1 = new TestItem({
  name: 'testItem1',
  order: 1
});

const testItem2 = new TestItem({
  name: 'testItem2',
  order: 2
});

const testItem3 = new TestString('testItem2');

const createContainer = (): Container => {
  const container = new Container();
  return container.addComponent(testItem1);
};

const addSecondComponent = (container: Container): Container => {
  return container.addComponent(testItem2);
};

const addStringComponent = (container: Container): Container => {
  return container.addComponent(testItem3);
};

describe('Container with components', () => {
  it('should be object', () => {
    const container = createContainer();
    expect(container).to.be.an('object');
  });

  it('should have two items', () => {
    const container = createContainer();
    addSecondComponent(container);
    expect(container.getAllComponents())
      .to.be.an('array')
      .with.length(2);
  });

  it('first item should have order 1', () => {
    const container = createContainer();
    addSecondComponent(container);
    const item = container.getAllComponents()[0];
    expect(item)
      .to.have.property('props')
      .with.property('order')
      .eq(1);
  });

  it('second item should have order 2', () => {
    const container = createContainer();
    addSecondComponent(container);
    const item = container.getAllComponents()[1];
    expect(item)
      .to.have.property('props')
      .with.property('order')
      .eq(2);
  });

  it('should have two items by type: TestItem', () => {
    const container = createContainer();
    addSecondComponent(container);
    expect(container.getComponents(TestItem))
      .to.be.an('array')
      .with.length(2);
  });

  it('container with 3 items should have two items by type: TestItem', () => {
    const container = createContainer();
    addSecondComponent(container);
    addStringComponent(container);
    expect(container.getComponents(TestItem))
      .to.be.an('array')
      .with.length(2);
  });

  it('container with 3 items should have one items by type: TestString', () => {
    const container = createContainer();
    addSecondComponent(container);
    addStringComponent(container);
    expect(container.getComponents(TestString))
      .to.be.an('array')
      .with.length(1);
  });

  it('container with 3 items should be able to get one component by type: TestString', () => {
    const container = createContainer();
    addSecondComponent(container);
    addStringComponent(container);
    expect(container.getComponent(TestString))
      .to.be.an('object')
      .with.property('prop');
  });

  it('container with 3 items should dispose', () => {
    const container = createContainer();
    addSecondComponent(container);
    addStringComponent(container);
    container.dispose();
    // eslint-disable-next-line no-unused-expressions
    expect(container).to.be.an('object').that.is.empty;
  });
});
