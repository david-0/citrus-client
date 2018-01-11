export class ImmutableWrapper {
  static wrap<T>(object: T): T {
    const itemPropertyNames = Object.getOwnPropertyNames(object);
    const newObject = <T>{};
    itemPropertyNames.forEach((name) => {
      Object.defineProperty(newObject, name, {
        get: function () {
          return object[name];
        },
      });
    });
    return newObject;
  }
}
