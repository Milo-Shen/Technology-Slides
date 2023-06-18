// 定义一个泛型接口 IPerson 表示一个类，它返回的实例对象取决于使用接口时传入的泛型 T
interface IPerson<T> {
  new (...args: unknown[]): T;
}

function getInstance<T>(Clazz: IPerson<T>) {
  return new Clazz();
}

// use it
class Person {}

// TS推断出函数返回值是person实例类型
const person = getInstance(Person);
