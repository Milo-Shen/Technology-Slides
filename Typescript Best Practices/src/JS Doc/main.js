// ts 是 js 的超集, 因此只要是 js 与 js 可以互相调用的, ts 均可以调用，只不过有时需要增加declare声明来解决编译时报错。
// 可以 JSDoc 的方式给 JS 代码增加类型推断的能力，例如

/** @type {number} */
let x;
x = 0; // OK
x = false; // Error: boolean is not assignable to number