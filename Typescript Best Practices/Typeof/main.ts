// 巧用 typeof

interface Opt {
  timeout: number;
}
const defaultOption: Opt = {
  timeout: 500,
};

// 有时候可以反过来：
const defaultOption1 = {
  timeout: 500,
};
type Opt1 = typeof defaultOption1;
// 当一个 interface 总有一个字面量初始值时，可以考虑这种写法以减少重复代码。