// 在 Npm 包、UMD 中扩展全局变量

// 在声明文件中扩展全局变量利用合并声明的方式可以非常容易的进行扩展
// 而在 Npm 包、UMD 的声明文件中如果我们想扩展全局变量那应该如何做呢
// 上边我们说到过，任何声明文件中只要存在 export/import 关键字的话，该声明文件中的 declare 都会变成模块内的声明而非全局声明
// 比如，我们在自己定义的 axios.d.ts 中：

// types/axios.d.ts

declare function axios(): string;

// 此时声明的 interface 为模块内部的String声明
declare interface String {
  hello: () => void;
}

export default axios;

// index.ts
// 'a'.hello(); // 类型 “"a"” 上不存在属性 “hello”

// 此时内部声明的 String 接口扩展被认为是模块内部的接口拓展，我们在全局中使用是会提示错误的
// 针对于 Npm 包中需要进行全局声明的话，TS 同样为我们提供了 declare global 来解决这个问题：

declare function axios(): string;

// 模块内部通过 declare global 进行全局声明
// declare global 内部的声明语句相当于在全局进行声明
declare global {
  interface String {
    hello: () => void;
  }
}

export default axios;

// index.ts
'a'.hello(); // correct
