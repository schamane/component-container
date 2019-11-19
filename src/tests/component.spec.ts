import 'mocha';
import { expect } from 'chai';
import { Component } from '../component';

class BaseType {
  type: string;
}

const base: BaseType = { type: 'function' };

describe('Component', () => {
  it('should be able to create empty component', () => {
    const component = new Component(BaseType);
    expect(component).to.be.an('object');
    expect(component).to.have.property('type');
  });

  it('should have classname property equal to constructor', () => {
    const component = new Component(BaseType);
    expect(component.type).to.equal(base.type);
  });

  it('should have classname property equal to constructor', () => {
    const component = new Component(BaseType);
    expect(component.type).to.equal(base.type);
  });
});
