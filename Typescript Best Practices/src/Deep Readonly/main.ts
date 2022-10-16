// 巧用 DeepReadonly

type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
}

const a = { foo: { bar: 22 } }
const b = a as DeepReadonly<typeof a>
// b.foo.bar = 33  // Hey, stop!
