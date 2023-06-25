// export =

// 当然，我们上述提到的都是关于 ESM 相关的类型声明文件
// TS 中的类型声明文件同样为我们提供了使用 export = 的 CJS 模块相关语法：

export = axios;
declare function axios(): void;
import axios = require('axios');

// 可以看到上述的代码，我们通过 export = axios 定义了一个相关的 CJS 模块语法
// 需要额外注意的是在 ts 中若要导入一个使用了export = 的模块时，必须使用 TypeScript 提供的特定语法 import module = require("module")
// 在日常业务中，不可避免我们会碰到一些相关 commonjs 规范语法的模块，那么当我们需要扩充对应的模块或者为该模块声明定义文件时，就需要使用到上述的 export = 这种语法了
// 当然，export = 这种语法不仅仅可以支持 cjs 模块。它也同样是 ts 为了 ADM 提出的模块兼容声明。有兴趣的朋友可以详细查阅官方文档
