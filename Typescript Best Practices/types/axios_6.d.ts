// 扩展 Npm 包类型
// 大多数时候我们使用一些现成的第三方库时都已经有对应的类型声明文件了，但有些情况下我们需要对于第三方库中某些属性进行额外的扩展或者修改
// 直接去修改 node_modules 中的第三方 TS 类型声明文件显然是不合理的，那么此时就需要我们通过类型声明文件扩展第三方库的声明
// 同样 TypeScript 提供给了我们一种 declare module 的语法来进行模块的声明
// 通常在我们可以利用 declare module 语法在进行新模块的声明的同时，也可以使用它来对于已有第三方库进行类型定义文件的扩展
// 在进行模块扩展时，需要额外注意如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块
// 比如，通常我们在项目中使用 axios 库时，希望在请求的 config 中支持传递一些自定义的参数，从而在全局拦截器中进行拿到我们的自定义参数
// 如果直接在 TS 文件下进行属性赋值和取值的话，TS 会抛出异常的:

// 同样，我们可以利用 declare module 来进行第三方 NPM 包的扩展，我们可以看到 axios 请求中第二个参数的类型为 AxiosRequestConfig 类型
import axios from './axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    // 模块内的接口申明会自动合并
    loginEvents: boolean;
  }
}

// 此时，我们在回到刚才的代码中可以发现无论我们是取值还是赋值，TS 都可以很好的帮我们进行出类型推断
