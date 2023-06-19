// 逆变

// 我们都清楚 TS 属于静态类型检测，所谓类型的赋值是要保证安全性的
// 通俗来说也就是多的可以赋值给少的，上述代码因为 a 的类型定义中完全包括 b 的类型定义，所以 a 类型完全是可以赋值给 b 类型，这被称为类型兼容性
let a1!: { a: string; b: number };
let b1!: { a: string };
b1 = a1;

let fn1!: (a: string, b: number) => void;
let fn2!: (a: string, b: number, c: boolean) => void;
// fn1 = fn2; TS Error: 不能将fn2的类型赋值给fn1
// 针对于 fn1 声明时，函数类型需要接受两个参数，换句话说调用 fn1 时我需要支持两个参数的传入分别是 a:string 和 b:number。
// 同理 fn2 函数定义时，定义了三个参数那么调用 fn2 时自然也需要传入三个参数。
// 那么此时，我们将 fn2 赋值给 fn1 ，我们可以思考下。如果赋值成功了，当我调用 fn1 时，其实相当于调用 fn2 没错吧。
// 但是，由于 fn1 的函数类型定义仅仅支持两个参数 a:string 和 b:number 即可。但是由于我们执行了 fn1 = fn2。
// 调用 fn1 时，实际相当于调用了 fn2 函数。但是类型定义上来说 fn1 满足两个参数传入即可，而 fn2 是实打实的需要传入 3 个参数。
// 那么此时，如果执行了 fn1 = fn2 当调用 fn1 时明显参数个数会不匹配（由于类型定义不一致）会缺少一个第三个参数，显然这是不安全的，自然也不是被 TS 允许的。

// 按照刚才的思路来分析，我们将 fn1 赋值给 fn2。fn2 的类型定义需要支持三个参数的传入，但实际 fn2 内部指针已经被修改称为 fn1 的指针
// fn1 在执行时仅仅需要两个参数 a: string, b: number，显然 fn2 的类型定义中是满足这个条件的（当然它还多传递了第三个参数 c:boolean，在 JS 中对于函数而言调用时的参数个数大于定义时的参数个数是被允许的）。
// 自然，这是安全的也是被 TS 允许赋值
fn2 = fn1; // 正确，被允许

// 就比如上述函数的参数类型赋值就被称为逆变，参数少（父）的可以赋给参数多（子）的那一个。看起来和类型兼容性（多的可以赋给少的）相反，但是通过调用的角度来考虑的话恰恰满足多的可以赋给少的兼容性原则。
// 上述这种函数之间互相赋值，他们的参数类型兼容性是典型的逆变

// 我们再来看一个稍微复杂点的例子来加深所谓逆变的理解：
class Parent {}

// Son继承了Parent 并且比parent多了一个实例属性 name
class Son extends Parent {
  public name: string = 'Son Name';
}

// GrandSon继承了Son 在Son的基础上额外多了一个age属性
class Grandson extends Son {
  public age: number = 3;
}

// 分别创建父子实例
const son = new Son();

function someThing(cb: (param: Son) => any) {
  // do some someThing
  // 注意：这里调用函数的时候传入的实参是Son
  cb(Son);
}

// someThing((param: Grandson) => param); // error
someThing((param: Parent) => param); // correct
// 我们先用刚才的结论来推导。刚才我们提到过函数的参数的方式被称为逆变，所以当我们调用 someThing 时传递的 callback 需要赋给定义 something 函数中的 cb 。
// 换句话说类型 (param: Grandson) => param 需要赋给 cb: (param: Son) => any，这显然是不被允许的。
// 因为逆变的效果函数的参数只允许“从少的赋值给多的”，显然 Grandson 相较于 Son 来说多了一个 name 属性，所以这是不被允许的。
// 相反，第二个 someThing((param: Parent) => param); 相当于函数参数重将 Parent 赋给 Son 将少的赋给多的满足逆变，所以是正确的。
// 之后我们在尝试分析为什么第二个 someThing((param: Parent) => param); 是正确的。
// 首先我们需要注意到我们在定义 someThing 函数时，声明了这个函数接受一个 cb 的函数。这个函数接受一个类型为 Son 的参数。
// someThing 内部cb 函数声明时需要满足 Son 的参数，它会在 cb 函数调用时传入一个 Son 参数的实参。
// 所以当我们传入 someThing((param: Parent) => param) 时，相当于在 something 函数内部调用 (param: Parent) => param 时会根据 someThing 中 callback 的定义传入一个 Son 。
// 那么此时，我们函数真实调用时期望得到是 Parent，但是实际得到了 Son 。Son 是 Parent 的子类涵盖所有 Parent 的公共属性方法，自然也是满足条件的。
// 反而言之，当我们使用someThing ((param: Grandson) => param); ，由于 something 定义 cb 的类型传入 Son，但是真实调用 someThing 时，我们确需要一个 Grandson 类型参数的函数，这显然是不符合的。
// 关于逆变我用了比较多的篇幅去描述它，我希望通过文章大家都可以对于逆变结合实例来理解并应用它。因为它的确稍微有些绕。

// 协变
// 解决了逆变之后，其实协变对于大伙儿来说都是小意思。我们先来看看这个 Demo:
let fn3!: (a: string, b: number) => string;
let fn4!: (a: string, b: number) => string | number | boolean;

fn4 = fn3; // correct
// fn1 = fn2; error: 不可以将 string | number | boolean 赋给 string 类型
// 这里，函数类型赋值兼容时函数的返回值就是典型的协变场景，我们可以看到 fn1 函数返回值类型规定为 string，fn2 返回值类型规定为 string | number | boolean 。
// 显然 string | number | boolean 是无法分配给 string 类型的，但是 string 类型是满足 string | number | boolean 其中之一，所以自然可以赋值给 string | number | boolean 组成的联合类型。
// 其实这就是协变....当然你也可以尝试从函数运行角度来解读协变的概念，比如当 fn1 运行结束要求返回 string ， fn2 运行结束后要求返回 string | number | boolean 。
// 将 fn1 赋给 fn2, fn1 要求返回值是 string, 而真实调用的 fn1=fn2 相当于调用了 fn2 自然 string | number | boolean 无法满足string类型的要求，所以 TS 会认为这是错误的。