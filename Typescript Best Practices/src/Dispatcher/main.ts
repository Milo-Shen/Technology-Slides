// Typescript 的分发
type GetSomeType<T extends string | number> = T extends string ? 'a' : 'b';
let someTypeOne: GetSomeType<string>; // someTypeOne 类型为 'a'
let someTypeTwo: GetSomeType<number>; // someTypeTwo 类型为 'b'

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
// 此时的 T 并不是一个单独的”裸类型“ T, 而是 [T]。注意观察 = 号右侧的 [T]，如果是 T, 则可以分发
type GetSomeType2<T extends string | number | [string]> = [T] extends string[] ? 'a' : 'b';

// 即使我们修改了对应的类型判断，仍然不会产生所谓的分发效果。因为[T]并不是一个裸类型
// 只会产生一次判断  [string] | number extends string[]  ? 'a' : 'b'
// someTypeFour 仍然只有 'b' 类型 ，如果进行了分发的话那么应该是 'a' | 'b'
let someTypeFour: GetSomeType2<[string] | number>;

// 分发的具体例子:
