// 之后，我们在项目的根目录（tsconfig.json）平级新建一个 types/axios.d.ts

// axios.d.ts
// 利用 export 关键字导出 name 变量
// 当然你可以为模块内添加对应各种各样的类型声明
export const name: string;
const axios: string;
export default axios;

// 上述我们就实现了一个简单的模块定义文件，关于 npm 包类型的声明有以下几种语法需要和大家强调下：
// export 导出变量
// export namespace 导出（含有子属性的）对象
// export default ES6 默认导出
// export = commonjs 导出模块

// export 关键字
// 需要额外留意的是npm 包的声明文件与全局变量的声明文件有很大区别。
// 在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量
// 只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明

// export 的语法与普通的 ts 中的语法类似，需要注意的是d.ts 的声明文件中禁止定义具体的实现
// 比如: types/axios/index.d.ts

// 导入变量
export const name: string;
// 导出函数
export function createInstance(): AxiosInstance;
// 导出接口 接口导出省略 export
export interface AxiosInstance {
  // ...
  data: any;
}
// 导出 Class
export class Axios {
  constructor(baseURL: string);
}
// 导出枚举
export enum Directions {
  Up,
  Down,
  Left,
  Right,
}
