// 巧用 Simplify

// Pick 自己
type Simplify<T> = Pick<T, keyof T>;

type A = { a: string };
type B = { b: number };
type E = A & B;
type F = Simplify<E>;

function app(arg: E) { }
function app_simplify(arg: F) { }

// todo: ? 如果实现 Deep Simplify