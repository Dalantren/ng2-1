import { GridError } from '../infrastructure/error';
import { hasOwnProperty, isUndefined } from '../utility/kit';

const resolvers = {};
export class TemplatePath {

  static get require() {
    const getName = this.name;
    return Object.keys(resolvers)
      .reduce((memo, key) => {
        memo[getName(key)] = `^^?${key}`;
        return memo;
      }, {});
  }

  constructor() {
  }

  static register(name, resolve) {
    if (hasOwnProperty.call(resolvers, name)) {
      throw new GridError(
        'template.path',
        `"${name}" is already registered`);
    }

    resolvers[name] = resolve;
    return TemplatePath;
  }

  static get(source) {
    const path = this.find(source);
    if (!path) {
      throw new GridError(
        'template.path',
        'Template path can\'t be found');
    }

    return path;
  }

  static find(source) {
    const getName = this.name;
    for (const key of Object.keys(resolvers)) {
      const name = getName(key);
      const value = source[name];
      if (!isUndefined(value) && value !== null) {
        const path = resolvers[key](source, value);
        if (path) {
          return path;
        }
      }
    }

    return null;
  }

  static getName(name) {
    return '_' + name;
  }
}
