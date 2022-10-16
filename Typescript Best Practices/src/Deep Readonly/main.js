"use strict";
// 巧用 DeepReadonly
var a = { foo: { bar: 22 } };
var b = a;
// b.foo.bar = 33  // Hey, stop!
