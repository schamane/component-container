// eslint-disable-next-line max-classes-per-file
import 'mocha';
import { expect } from 'chai';
import { Component } from '../component';

class BaseType {
  test: string;
}

class NumberBaseType {
  t: number;
}

class TestComponent<T extends BaseType | NumberBaseType = BaseType> extends Component<T> {}

describe('Component', () => {
  it('should be able to create empty component', () => {
    const component = new Component();
    // eslint-disable-next-line no-unused-expressions
    expect(component).to.be.not.empty;
  });

  it('should have type any', () => {
    const component = new Component();
    expect(component.getType()).to.be.eq('any');
  });

  it('generic constructor without type parameter should have any as a type', () => {
    const component = new Component<BaseType>();
    expect(component.getType()).to.be.equal('any');
  });

  it('should have type equal to generic constructor name', () => {
    const component = new Component<BaseType>(BaseType);
    expect(component.getType()).to.be.eq('BaseType');
  });

  it('should have type equal to type in constructor parameter', () => {
    const component = new TestComponent(BaseType);
    expect(component.getType()).to.be.equal('BaseType');
  });

  it('should have type equal to type in generic constructor parameter', () => {
    const component = new TestComponent<BaseType>(BaseType);
    expect(component.getType()).to.be.equal('BaseType');
  });

  it('typed component should overwrite type by generics', () => {
    const component = new TestComponent<NumberBaseType>(NumberBaseType);
    expect(component.getType()).to.be.equal('NumberBaseType');
  });
});
