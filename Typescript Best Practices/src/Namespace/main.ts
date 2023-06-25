/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// 使用命名空间的验证器

// Some samples to try
let strings = ['Hello', '98052', '101'];

// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(`"${s}" - ${validators[name].isAcceptable(s) ? 'matches' : 'does not match'} ${name}`);
  }
}

// 第一种方式，把所有的输入文件编译为一个输出文件，需要使用--outFile标记：
// tsc --outFile sample.js Test.ts
// 编译器会根据源码里的引用标签自动地对输出进行排序。你也可以单独地指定每个文件
// tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts

// 别名
// 另一种简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字
// 不要与用来加载模块的 import x = require('name')语法弄混了，这里的语法是为指定的符号创建一个别名。
// 你可以用这种方法为任意标识符创建别名，也包括导入的模块中的对象

namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

import polygons = Shapes.Polygons;
// Same as "new Shapes.Polygons.Square()"
let sq = new polygons.Square();

// 注意，我们并没有使用 require 关键字，而是直接使用导入符号的限定名赋值
// 这与使用 var 相似，但它还适用于类型和导入的具有命名空间含义的符号
// 重要的是, 对于值来讲, import 会生成与原始符号不同的引用，所以改变别名的 var 值并不会影响原始变量的值

// 使用其它的 JavaScript 库
// 为了描述不是用 TypeScript 编写的类库的类型，我们需要声明类库导出的 API。 由于大部分程序库只提供少数的顶级对象，命名空间是用来表示它们的一个好办法
// 我们称其为声明是因为它不是外部程序的具体实现。 我们通常在 .d.ts 里写这些声明。 如果你熟悉 C/C++，你可以把它们当做 .h 文件。 让我们看一些例子

// 外部命名空间
// 流行的程序库 D3 在全局对象d3里定义它的功能。 因为这个库通过一个 <script> 标签加载（不是通过模块加载器），它的声明文件使用内部模块来定义它的类型。 为了让 TypeScript 编译器识别它的类型，我们使用外部命名空间声明。 比如，我们可以像下面这样写：
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }

  export interface Event {
    x: number;
    y: number;
  }

  export interface Base extends Selectors {
    event: Event;
  }
}

declare var d3: D3.Base;
