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
