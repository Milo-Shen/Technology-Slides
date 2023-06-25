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
// 重要的是，对于值来讲， import 会生成与原始符号不同的引用，所以改变别名的 var 值并不会影响原始变量的值
