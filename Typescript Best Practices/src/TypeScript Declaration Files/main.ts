// TypeScript 模块解析规则

// TS 中的加载策略分为两种方式，分别为相对路径和绝对路径两种方式
// TypeScript 将 TypeScript 源文件扩展名（.ts、.tsx和.d.ts）覆盖在 Node 的解析逻辑上

// 例子:
// 假设当前执行路径为 /root/src/module_a
// import { b } from './module_b'

// 此时，TS 对于 ./module_b 的加载方式其实是和 node 的模块加载机制比较类似：
// 首先寻找 /root/src/module_b.ts 是否存在，如果存在使用该文件
// 其次寻找 /root/src/module_b.tsx 是否存在，如果存在使用该文件
// 其次寻找 /root/src/module_b.d.ts 是否存在，如果存在使用该文件
// 其次寻找 /root/src/module_b/package.json，如果 package.json 中指定了一个types属性的话那么会返回该文件
// 如果上述仍然没有找到，之后会查找 /root/src/module_b/index.ts
// 如果上述仍然没有找到，之后会查找 /root/src/module_b/index.tsx
// 如果上述仍然没有找到，之后会查找 /root/src/module_b/index.d.ts

// 可以看到 TS 中针对于相对路径查找的规范是和 nodejs 比较相似的
// TS 在寻找文件路径时，在某些条件下是会按照目录去查找 .d.ts 的

// 非相对导入:
// 在了解了相对路径的加载方式之后，我们来看看关于所谓的非相对导入是 TS 是如何解析的
// 我们可以稍微回想一下平常在 nodejs 中对于非相对导入的模块是如何被 nodejs 解析的。没错，它们的规则大同小异
// 比如下面这段代码:

