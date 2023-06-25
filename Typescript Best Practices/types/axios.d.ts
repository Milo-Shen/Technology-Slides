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