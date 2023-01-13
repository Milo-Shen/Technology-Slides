interface O {
  a: string;
  b: number;
}
function fn(o: O) {}

// 函数参数是对象时, 不会对对象引用做检查处理
const o = { a: 'a', b: 1, c: 3 };
fn(o);

// 函数参数是对象时, 会对对象字面量做额外的属性检查
// 下面一行不通过, 提示'c' does not exist in type 'O'
// fn({ a: 'a', b: 1, c: 3 });

// Type 和 Interface 的区别
// 1. type能够声明别名而interface不行
// 2. interface拥有声明合并的特性而type没有
interface Bar {
  a: string;
  b: number;
}

interface Bar {
  c: string;
}

// TypeScript的类型兼容性是基于结构的而非名义的
// 下面这段代码里, Employee 类没有实现 Named 的接口, 但由于内部结构是一致的, 所以不会报错
interface Named {
  name: string;
}

class Employee {
  name: string;

  constructor() {
    this.name = '';
  }
}

let employee: Named = new Employee();


// this 参数的使用和作用
interface ThisExp {
  a: string;
  // 补充对this的规定
  do(this: ThisExp): void;
}

const this_exp: ThisExp = {
  a: '1',
  do: function () {
    console.log(this.a);
  },
};
// 传递过程中导致this丢失, 指向全局, 但是并没有收到报错
const fn_exp_do = this_exp.do;
// 报错, 提示：The 'this' context of type 'void' is not assignable to method's 'this' of type 'O'
// fn_exp_do();
