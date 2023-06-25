import logo from './example.svg';

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

// 解析 *.d.ts 声明
// 上边我们聊了聊 TS 中对于加载两种不同模块的方式，可是日常开发中，经常有这样一种场景
// 比如，在 TS 项目中我们需要引入一些后缀为 png 的图片资源，那么此时 TS 是无法识别此模块的
// 解决方法也非常简单，通常我们会在项目的根目录中也就是和 tsconfig.json 平级的任意目录中添加对应的声明文件 image.d.ts:

// declare module '*.png' {
//   const src: string;
//   export default src;
// }

// 可以看到，通过定义声明文件的方式解决了我们的问题。
// 可是，你有思考过按照上边的 typescript 对于模块的加载方式，它是怎么加载到我们声明的 image.d.ts 的吗 ？
// 这是一个有意思的问题，按照上边我们提到的模块加载机制要么按照相对模块机制查找，要么按照对应的 node 模块解析机制进行查找
// 怎么会查找到定义在项目目录中的 image.d.ts 呢 ？

// 本质上我们引入任何模块时，加载机制无非就是我们上边提到的两种加载方式。
// 不过，这里有一个细小的点即是 ts 编译器会处理 tsconfig.json 的 file、include、exclude 对应目录下的所有 .d.ts 文件：
// 简单来说，ts 编译器首先会根据 tsconfig.json 中的上述三个字段来加载项目内的 d.ts 全局模块声明文件，自然由于 '.png' 文件会命中全局加载的 image.d.ts 中的 声明的 module 所以会找到对应的文件
// include 在未指定 file 配置下默认为 **，表示 tsc 解析的目录为当前 tsconfig.json 所在的项目文件夹
// 关于 file、include、exclude 三者的区别我就不详细展开了，本质上都是针对于 TSC 编译器处理的范围。后续如果大伙有兴趣，我可以单独开一个 tsconfig.json 的文章去详细解释配置

// 详解 typescript 声明文件
// 其实不是这样的，学会类型声明文件的编写并不仅仅是为了编写库声明。大多数时候，我们在日常业务中对于第三方库需要做一些自定一的扩展扩充
// 大多数时候一些库提供的泛型参数其实并不能很好的满足我们的需求，所以利用 *.d.ts 扩展第三方库在业务中是非常常见的需求
// 注意，声明文件一定要以 [name].d.ts 结尾

// 比如我们在项目内定义一个 jquery.d.ts 时:
// src/jQuery.d.ts
// 定义全局变量 jQuery，它是一个方法
// declare var jQuery: (selector: string) => any;
// 之后我们在项目内的 TS 文件中就可以在全局自由的使用声明的 jQuery 了：
// jQuery('#root')
// 正常来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了
// 当然，上边我们提过到关于 tsc 文件的编译范围。所以如果找不到情况可以自行检查对应的 files、include 和 exclude 配置

// 全局变量
// declare var 声明全局变量
// declare function 声明全局方法
// declare class 声明全局类
// declare enum 声明全局枚举类型
// declare namespace 声明（含有子属性的）全局对象
// interface 和 type 声明全局类型

// 上述罗列了 6 中全局声明的语句，我们可以通过 declare 关键字结合对应的类型，从而在任意 .d.ts 中进行全局类型的声明
// 比如我们以 namespace 举例：
// 假设我们的业务代码中存在一个全局的模块对象 MyLib，它拥有一个名为 makeGreeting 的方法以及一个 numberOfGreetings 数字类型属性。
// 当我们想在 TS 文件中使用该 global 对象时, TS 会告诉我们找不到 myLib
// 原因其实非常简单，typescript 文件中本质上是对于我们的代码进行静态类型检查。当我们使用一个没有类型定义的全局变量时，TS 会明确告知找不到该模块。

// 当然，我们可以选择在该文件内部对于该模块进行定义并且进行导出，Like this:
// export namespace myLib {
//   export let makeGreeting: (string: string) => string;
//   export let numberOfGreetings: number;
// }

let result = myLib.makeGreeting('hello, world');
console.log('The computed greeting is:' + result);
let count = myLib.numberOfGreetings;

// 上述的代码的确在模块文件内部定义了一个 myLib 的命名空间，在该文件中我们的确可以正常的使用 myLib
// 可是，在别的模块文件中我们如果仍要使用 myLib 的话，也就意味着我们需要手动再次 import 该 namespace
// 这显然是不合理的，所以 TS 为我们提供了全局的文件声明 .d.ts 来解决这个问题
// 我们可以通过在 ts 的编译范围内声明 [name].d.ts 来定义全局的对象的命名空间。 比如：

// declare namespace myLib {
//   function makeGreeting(s: string): string;
//   let numberOfGreetings: number;
// }

// 可以看到上图的右边，此时当我们使用 myLib 时， TS 可以正确的识别到他是 myLib 的命名空间
// 如果你的 [name].d.ts 不生效，那么仔细检查你的 tsconfig.json -> include 设置
// 虽然说随着 ES6 的普及，ts 文件中的 namespace 已经逐渐被淘汰掉了
// 但是在类型声明文件中使用 declare namespace xxx 声明类似全局对象仍然是非常实用的方法

// 声明合并
// 上边我们讲述了如何在类型声明文件中进行全局变量的声明，接下来其他部分之前我们先来聊聊 TS 中的声明合并

// 接口自动合并
interface Props {
  name: string;
}

interface Props {
  age: 18;
}

const my_info: Props = {
  name: 'Milo-Shen',
  age: 18,
};

// 但是需要注意的是，无论哪种声明合并必须遵循合并的属性的类型必须是唯一的，比如：
// interface Props {
//   name: string;
// }
// // 后续属性声明必须属于同一类型。属性 “name” 的类型必须为 “string”，但此处却为类型 “18”
// interface Props {
//   name: 18;
// }

// declare 合并
declare namespace axios {
  interface Props {
    name: string;
  }
}

declare namespace axios {
  interface Props {
    age: string;
  }
}
const a: axios.Props = {
  name: 'Milo-Shen',
  age: '12',
};

// 这里可以看到在右边的声明文件中进行了名为 axios 全局命名空间声明，同时在左边的文件中我们使用了 axios.Props 类型
// 其实本质上就是相同命名空间内的接口合并，当然我们可以利用 declare 声明合并达到更多的效果。后续我们会详细提到
