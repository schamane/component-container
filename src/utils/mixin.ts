/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function mixin(derivedCtor: any, baseCtors: any[]): void {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      /*
      const descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);

      if (name === 'constructor') return;

      if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
        Object.defineProperty(derivedCtor.prototype, name, descriptor);
      } else {
        // eslint-disable-next-line no-param-reassign
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
      */
    });
  });
}
