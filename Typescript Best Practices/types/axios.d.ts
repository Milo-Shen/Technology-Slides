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