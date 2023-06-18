// 当泛型 T 满足 string 类型的约束时，它会返回 true ，否则则会返回 false 类型
// 需要注意的是条件类型 a extends b ? c : d 仅仅支持在 type 关键字中使用。
type isString<T> = T extends string ? true : false;

// a 的类型为 true
// 此处的 'a' 为字面量类型
let aa: isString<'a'> = true;

// b 的类型为 false
// 此处的 1 为字面量类型
let bb: isString<1> = false;

// 其实所谓的条件类型就是这么简单，看起来和三元表达式非常相似，甚至你完全可以将它理解成为三元表达式
// 只不过它接受的是类型以及判断的是类型而已
// 这里的 T extends string 更像是一种判断泛型 T 是否满足 string 的判断，和之前所讲的泛型约束完全不是同一个意思

// 上述我们讲的泛型约束是在定义泛型时进行对于传入泛型的约束，而这里的 T extends string ? true : false 并不是在传入泛型时进行的约束。
// 在使用 isString 时，你可以为它传入任意类型作为泛型参数的实现。但是 isString 类型内部会对于传入的泛型类型进行判断，如果 T 满足 string 的约束条件，那么返回类型 true，反过来则是 false

// Typescript 的分发
type GetSomeType<T extends string | number> = T extends string ? 'a' : 'b';
let someTypeOne: GetSomeType<string> // someTypeOne 类型为 'a'
let someTypeTwo: GetSomeType<number> // someTypeTwo 类型为 'b'

// 此处分发生效，所以最终的类型为 a | b 的联合类型
// 我们抛开晦涩的概念来解读分发，结合上边的 Demo 来说所谓的分发简单来说就是分别使用 string 和 number 这两个类型进入 GetSomeType 中进行判断，最终返回两次类型结果组成的联合类型。
let someTypeThree: GetSomeType<string | number>;

// 我们抛开晦涩的概念来解读分发，结合上边的 Demo 来说所谓的分发简单来说就是分别使用 string 和 number 这两个类型进入 GetSomeType 中进行判断，最终返回两次类型结果组成的联合类型。

// 那么，什么情况下会产生分发呢？ 满足分发需要一定的条件，我们来一起看看：
// 1. 首先，毫无疑问分发一定是需要产生在 extends 产生的类型条件判断中，并且是前置类型。
//    (比如 T extends string | number ? 'a' : 'b'; 那么此时，产生分发效果的也只有 extends 关键字前的 T 类型，string | number 仅仅代表一种条件判断。)
// 2. 其次，分发一定是要满足联合类型，只有联合类型才会产生分发（其他类型无法产生分发的效果，比如 & 交集中等等）
// 3. 最后，分发一定要满足所谓的裸类型中才会产生效果

// 下面是关于裸类型的解释 ( 裸类型 naked type )
// 此时的 T 并不是一个单独的”裸类型“ T, 而是 [T]。注意观察 = 号右侧的 [T]
type GetSomeType2<T extends string | number | [string]> = [T] extends string[]
    ? 'a'
    : 'b';

// 即使我们修改了对应的类型判断，仍然不会产生所谓的分发效果。因为[T]并不是一个裸类型
// 只会产生一次判断  [string] | number extends string[]  ? 'a' : 'b'
// someTypeFour 仍然只有 'b' 类型 ，如果进行了分发的话那么应该是 'a' | 'b'
let someTypeFour: GetSomeType2<[string] | number>;