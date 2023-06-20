// unknown & any

// 在 TypeScript 中同样存在一个高级类型 unknown ，它可以代表任意类型的值，这一点和 any 是非常类型的
// 但是我们清楚将类型声明为 any 之后会跳过任何类型检查，比如这样：
let myName: any;
myName = 1;
// 这明显是一个bug
// myName();

// 而 unknown 和 any 代表的含义完全是不一样的, 虽然 unknown 可以和 any 一样代表任意类型的值, 但是这并不代表它可以绕过 TS 的类型检查
let myName1: unknown;
myName1 = 1;
// ts error: unknown 无法被调用，这被认为是不安全的
// myName1();
// 使用typeof保护myName类型为function
if (typeof myName1 === 'function') {
  // 此时myName的类型从unknown变为function
  // 可以正常调用
  myName1();
}

// 通俗来说 unknown 就代表一些并不会绕过类型检查但又暂时无法确定值的类型，我们在一些无法确定函数参数（返回值）类型中 unknown 使用的场景非常多。比如：
// 在不确定函数参数的类型时
// 将函数的参数声明为unknown类型而非any
// TS同样会对于unknown进行类型检测，而any就不会
function resultValueBySome(val: unknown) {
  if (typeof val === 'string') {
    // 此时 val 是string类型
    // do someThing
  } else if (typeof val === 'number') {
    // 此时 val 是number类型
    // do someThing
  }
  // ...
}
