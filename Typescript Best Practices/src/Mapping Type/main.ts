// 循环

// TypeScript 中同样存在对于类型的循环语法(Mapping Type)，通过我们可以通过 in 关键字配合联合类型来对于类型进行迭代

interface IProps {
  name: string;
  age: number;
  highSchool: string;
  university: string;
}

// IPropsKey类型为
// type IPropsKey = {
//  name: boolean;
//  age: boolean;
//  highSchool: boolean;
//  university: boolean;
//  }

type IPropsKey = { [K in keyof IProps]: boolean };

// 其实相对来说循环关键字 in 比较简单，上述代码我们声明了一个所谓的 IPropsKey 的类型
// 首先可以看到这个类型是一个对象，对象中的 key 为 [] 包裹的可计算值，value 为 boolean
// 而 [K in keyof IProps] 正是我们在类型内部声明了一个变量 K, 你可以理解为 in 关键字的作用类似于 for 循环，它会循环 keyof IProps 这个联合类型中的每一项类型，同时在每一次循环中将对应的类型赋值给 K

// 实际用法, MyPartial
// 当然，还有许多内置类型同样利用了循环，比如 Required、Readonly 等等
interface IInfo {
  name: string;
  age: number;
}
type MyPartial<T> = { [K in keyof T]?: T[K] };
type OptionalInfo = MyPartial<IInfo>;

// 当然需要注意的是我们刚才提到的所有关键字，比如 extends 进行条件判断或者 in 进行类型循环时，仅仅支持在 type 类型声明中使用，并不可以在 interface 中使用，这也是 type 和 interface 声明的一个不同。

// 当然在循环的最后，我们来思考另一个问题。其实你会发现无论是 TS 内置的 Partial 还是我们刚刚自己实现的 Partial ，它仅仅对象中一层的转化并不能递归处理。
interface IInfo2 {
  name: string;
  age: number;
  school: {
    middleSchool: string;
    highSchool: string;
    university: string;
  };
}
type OptionalInfo2 = Partial<IInfo2>;

// 大家可以往上边提到过的条件判断和循环结合来考虑下:
interface IInfo3 {
  name: string;
  age: number;
  school: {
    middleSchool: string;
    highSchool: string;
    university: string;
  };
}

type deepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? deepPartial<T[K]> : T[K];
};

type OptionalInfo3 = deepPartial<IInfo3>;

let value3: OptionalInfo3 = {
  name: '1',
  school: {
    middleSchool: 'xian',
  },
};

// Pick 的自我实现
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface APick {
  uid: number;
  username: string;
}

type BPick = MyPick<APick, 'username'>;

// Omit 的自我实现
type MyOmit<T, K extends keyof any> = MyPick<T, MyExclude<keyof T, K>>;

interface AOmit {
  uid: number;
  username: string;
}

type BOmit = MyOmit<AOmit, 'username'>;
