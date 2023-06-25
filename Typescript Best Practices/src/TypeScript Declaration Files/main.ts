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

// 假设当前文件所在路径为 /root/src/module_a
// import { b } from 'module_b'

// /root/src/node_modules/module_b.ts
// /root/src/node_modules/module_b.tsx
// /root/src/node_modules/module_b.d.ts
// /root/src/node_modules/module_b/package.json（如果它指定了一个types属性）
// /root/src/node_modules/@types/module_b.d.ts
// /root/src/node_modules/module_b/index.ts
// /root/src/node_modules/module_b/index.tsx
// /root/src/node_modules/module_b/index.d.ts

// 此时，TS 仍然会按照 node 的模块解析规则，继续向上进行目录查找，比如又会进入上层目录 /root/node_modules/module_b.ts ...进行查找，直到查找到顶层 node_modules 也就是最后一个查找的路径为 /node_modules/module_b/index.d.ts 如果未找到则会抛出异常 can't find module 'module_b'
// 上述查找规则是基于 tsconfig.json 中指定的 moduleResolution:node，当然还有 classic 不过 classic 规则是 TS 为了兼容老旧版本，现代代码中基本可以忽略这个模块查找规则