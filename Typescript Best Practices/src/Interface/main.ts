// 例子 1:
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

// 例子 2:
// 声明一个接口 IPerson2 代表函数
interface IPerson2 {
  // 此时注意泛型是在函数中参数 而非在 IPerson2 接口中
  <T>(a: T): T;
}

// 函数接受泛型
const getPersonValue: IPerson2 = <T>(a: T): T => {
  return a;
};

// 相当于 getPersonValue<number>(2)
let value = getPersonValue(2);

// 这里上下两个例子特别像强调的是关于泛型接口中泛型的位置是代表完全不同的含义：
// 1. 当泛型出现在接口中时，比如 interface IPerson<T> 代表的是使用接口时需要传入泛型的类型，比如 IPerson<T>。
// 2. 当泛型出现在接口内部时，比如第二个例子中的 IPerson2 接口代表一个函数，接口本身并不具备任何泛型定义。
//    而接口代表的函数则会接受一个泛型定义。换句话说接口本身不需要泛型，而在实现使用接口代表的函数类型时需要声明该函数接受一个泛型参数。