// 巧用联合类型
// Dinner 要么有 fish 要么有 bear

//   Not good.
interface Dinner1 {
  fish?: number;
  bear?: number;
}

//   Awesome!
type Dinner2 =
  | {
    fish: number;
  }
  | {
    bear: number;
  };

// 一些区别：
// 1. Dinner1 对于初始值的限制较弱
let d1: Dinner1 = {}; // oops
d1 = { fish: 1, bear: 1 }; // oops

// 1. Dinner2 联合类型此处的初始值无法为空
// let d2: Dinner2 = {}; // Protected!
let d2 = { fish: 1, bear: 1 }; // Protected!

if ('fish' in d2) {
  // `d2` has `fish` and no `bear` here.
} else {
  // `d2` has `bear` and no `fish` here.
}
