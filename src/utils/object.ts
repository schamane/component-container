/* eslint-disable @typescript-eslint/no-explicit-any */

const INFINITY = 1 / 0;
const MAX_MEMOIZE_SIZE = 500;
const { toString } = Object.prototype;
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;
const charCodeOfDot = '.'.charCodeAt(0);
const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  '[^.[\\]]+' +
    '|' +
    // Or match property names within brackets.
    '\\[(?:' +
    // Match a non-string expression.
    '([^"\'][^[]*)' +
    '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
    ')\\]' +
    '|' +
    // Or match "" as the space between consecutive dots or empty brackets.
    '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
  'g'
);

interface MemoizedFunction extends Function {
  cache: Map<any, any>;
}

function memoize(func: Function, resolver: Function | null): MemoizedFunction {
  if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function');
  }
  const memoized = (...args: any[]): any => {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const { cache } = memoized;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}

memoize.Cache = Map;

function memoizeCapped(func: Function): MemoizedFunction {
  const result = memoize(func, (key: any): any => {
    const { cache } = result;
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  return result;
}

function getTag(value: any): string {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}

const stringToPath = memoizeCapped((string: string): string[] => {
  const result = [];
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }
  string.replace(rePropName, (match: string, expression: string, quote: string, subString: string): string => {
    let key = match;
    if (quote) {
      key = subString.replace(reEscapeChar, '$1');
    } else if (expression) {
      key = expression.trim();
    }
    result.push(key);
    return null;
  });
  return result;
});

function isSymbol(value: any): boolean {
  const type = typeof value;
  // eslint-disable-next-line eqeqeq
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]');
}

function isKey(value: any, object: any): boolean {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object));
}

function toKey(value: any): string | number | symbol {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }
  const result = `${value}`;
  // eslint-disable-next-line eqeqeq
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

function castPath(value: any, object: any): any[] {
  if (Array.isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(value);
}

function baseGet(object: any, path: unknown): any {
  const cPath = castPath(path, object);

  let index = 0;
  const { length } = cPath;
  let result = object;

  while (object != null && index < length) {
    // eslint-disable-next-line no-plusplus
    result = result[toKey(cPath[index++])];
  }
  return index && index === length ? result : undefined;
}

export const get = <T extends any = any>(object: unknown, path: unknown, defaultValue: T): T => {
  const result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
};

export const set = <T extends any = any>(object: any, path: string | number | symbol, value: T): {} => {
  if (object == null) {
    return object;
  }
  // eslint-disable-next-line no-param-reassign
  object[path] = value;
  return object;
};
