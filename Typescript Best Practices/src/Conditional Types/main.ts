type isString<T> = T extends string ? true : false;

// a 的类型为 true
// 此处的 'a' 为字面量类型
let aa: isString<'a'> = true;

// b 的类型为 false
// 此处的 1 为字面量类型
let bb: isString<1> = false;
