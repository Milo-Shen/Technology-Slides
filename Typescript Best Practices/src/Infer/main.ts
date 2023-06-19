// 待推断类型
// infer 代表待推断类型，它的必须和 extends 条件约束类型一起使用

// 之前, 我们在 类型关键字中遗留了 infer 关键字并没有展开讲述, 这里我们了解了所谓的 extends 代表的类型约束之后我们来一起看看所谓 infer 带来的待推断类型效果
// 在条件类型约束中为我们提供了 infer 关键字来提供实现更多的类型可能, 它表示我们可以在条件类型中推断一些暂时无法确定的类型，比如这样：
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

// 上述我们定义了一个 Flatten 类型, 它接受一个传入的泛型 Type, 我们在类型定义内部对于传入的泛型 Type 进行了条件约束：
// 如果 Type 满足 Array<infer Item>, 那么此时返回 Item 类型
// 如果 Type 不满足 Array<infer Item>类型, 那么此时返回 Type 类型

// 关于如何理解 Array<infer Item>, 一句话描述就是我们利用 infer 声明了一个数组类型, 数组中值的类型我们并不清楚所以使用 infer 来进行推断数组中的值。

// 我们为类型 Flatten 传入一个 string 类型, 显然传入的 string 并不满足数组的约束。自然直接返回传入的 string 类型
type subType1 = Flatten<string>;

// 可以看到返回的 subType2 类型为 string ｜ number, 我们来稍微分析这一过程：
type subType2 = Flatten<[string, number]>;
// 声明 Flatten<[string, number]> 时, Flatten 接受到一个 [string, number] 的泛型参数
// 显然 [string, number] 是满足数组的条件的, Type extends Array<infer Item>
// 所谓的 Array<infer Item> 代表的进行条件判断时要求前者（Type）必须是一个数组，但是数组中的类型我并不清楚（或者说可以是任意）
// 自然我们使用 infer 关键字表示待推断的类型， infer 后紧跟着类型变量 Item 表示的就是待推断的数组元素类型
// 我们类型定义时并不能立即确定某些类型，而是在使用类型时来根据条件来推断对应的类型。之后，因为数组中的元素可能为 string 也可能为 number, 自然在使用类型时 infer Item 会将待推断的 Item 推断为 string | number 联合类型
// 需要注意的是 infer 关键字类型, 必须结合 Conditional Types 条件判断来使用
// 那么, 在条件类型中结合 infer 会帮助我们带来什么样的作用呢? 我们一起来看看 infer 的实际用法

// 在 TS 中存在一个内置类型 Parameters, 它接受传入一个函数类型作为泛型参数并且会返回这个函数所有的参数类型组成的元祖。
// 定义函数类型
interface IFn {
  (age: number, name: string): void;
}

// type FnParameters = [age: number, name: string]
type FnParameters = Parameters<IFn>;
let paraType: FnParameters = [25, 'Milo-Shen'];

// 它的内部实现恰恰是利用 infer 来实现的，同学们可以自己尝试来实现这个内置类型
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer R) => any ? R : never;

// 其次我们在 MyParameters 内部对于 传入的泛型参数进行了条件判断，如果满足条件也就是 T extends ( ...args: infer R ) => any，需要注意的是条件判断中函数的参数并不是在类型定义时就确认的, 函数的参数需要根据传入的泛型来确认后赋给变量 R 所以使用了 infer R 来表示待推断的函数参数类型
// 那么此时我会返回满足条件的函数推断参数组成的数组也就是 ...args 的类型 R, 否则则返回 never
// 当然 TS 内部还存在比如 ReturnType 、ThisParameterType 等类型都是基于条件判断中的 infer 来推断出结果的，有兴趣的朋友可以自行查阅
// 日常工作中, 我们经常会碰到将元祖转化成为联合类型的需求, 比如 ['a',1,true] 我们希望快速得到元组中元素的类型应该如何实现呢 ?

type MyArrType<T extends any[]> = T extends Array<infer R> ? R : never;
type arrType = MyArrType<['a', 1, true]>;
