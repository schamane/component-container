/* eslint-disable no-unused-expressions */
import 'mocha';
import { expect } from 'chai';
import { Container } from '../container';
import { Component } from '../component';

describe('Container', () => {
  it('should be able to create container', () => {
    const cont = new Container();
    expect(cont).to.be.an('object');
    expect(cont).to.has.property('components');
  });

  it('should have components', () => {
    const cont = new Container();
    expect(cont).to.has.property('components');
  });

  it('should have components as array', () => {
    const cont = new Container();
    expect(cont)
      .to.has.property('components')
      .to.be.an('array');
  });

  it('getAllComponents should return empty array', () => {
    const cont = new Container();
    expect(cont.getAllComponents()).to.be.an('array').that.is.empty;
  });

  it('getAllComponents should return empty array after remove object', () => {
    const cont = new Container();
    const obj = {} as Component;
    cont.addComponent(obj);
    cont.removeComponent(obj);
    expect(cont.getAllComponents()).to.be.an('array').that.is.empty;
  });
});
