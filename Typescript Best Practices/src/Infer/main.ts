// 待推断类型
// infer 代表待推断类型，它的必须和 extends 条件约束类型一起使用

// 之前, 我们在 类型关键字中遗留了 infer 关键字并没有展开讲述, 这里我们了解了所谓的 extends 代表的类型约束之后我们来一起看看所谓 infer 带来的待推断类型效果
// 在条件类型约束中为我们提供了 infer 关键字来提供实现更多的类型可能, 它表示我们可以在条件类型中推断一些暂时无法确定的类型，比如这样：
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

// 上述我们定义了一个 Flatten 类型, 它接受一个传入的泛型 Type, 我们在类型定义内部对于传入的泛型 Type 进行了条件约束：
// 如果 Type 满足 Array<infer Item>, 那么此时返回 Item 类型
// 如果 Type 不满足 Array<infer Item>类型, 那么此时返回 Type 类型
// 关于如何理解 Array<infer Item>, 一句话描述就是我们利用 infer 声明了一个数组类型, 数组中值的类型我们并不清楚所以使用 infer 来进行推断数组中的值。