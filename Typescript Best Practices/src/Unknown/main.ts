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

// 当然, 在描述了 unknown 类型的含义之后, 关于 unknown 类型有一个特别重要的点我想和大家强调：
// unknown 类型可以接收任意类型的值，但并不支持将unknown赋值给其他类型
// any 类型同样支持接收任意类型的值，同时赋值给其他任意类型（除了never）
// any 和 unknown 都代表任意类型, 但是 unknown 只能接收任意类型的值, 而 any 除了可以接收任意类型的值, 也可以赋值给任意类型（除了 never）

let a4!: any;
let b4!: unknown;

// 任何类型值都可以赋给any、unknown
a4 = 1;
b4 = 1;

// callback函数接受一个类型为number的参数
function callback(val: number): void {}

// 调用callback传入aaa（any）类型 correct
callback(a4);

// 调用 callback 传入 b（unknown）类型给 val（number）类型 error
// ts Error: 类型 “unknown” 的参数不能赋给类型 “number” 的参数
// callback(b4);
