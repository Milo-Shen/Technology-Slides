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

// 例子 3:
// item 的类型取决于使用类型时传入的泛型参数
type Callback<T> = (item: T) => void;

// 在声明阶段就已经确定了 callback 接口中的泛型参数为外部传入的
const forEach = <T>(arr: T[], callback: Callback<T>) => {
  for (let i = 0; i < arr.length - 1; i++) {
    callback(arr[i]);
  }
};

// 自然，我们在调用forEach时显式声明泛型参数为 string | number 类型
// 所以根据 forEach 的函数类型定义时，
// 自然 callback 的 item 也会在定义时被推导为 T 也就是所谓的 string | number 类型
forEach<string | number>(['1', 2, 3, '4'], (item) => {});
// 所以，这一点在日常开发中希望小伙伴们一定要特别留意：在泛型接口中泛型的声明位置不同所产生的效果是完全不同的。

// 例子4: 使用 extends 关键字来实现泛型约束
interface IHasLength {
    length: number;
}

// 利用 extends 关键字在声明泛型时约束泛型需要满足的条件
function getLength<T extends IHasLength>(arg: T) {
    return arg.length;
}

getLength([1, 2, 3]); // correct
getLength('123'); // correct
getLength({ name: 'Jack', length: 100 }); // correct
// getLength(true); 因为 boolean 数据没有 length 属性，所以此处不满足泛型约束