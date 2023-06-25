// 混用 declare 和 export
// 上边我们提到过，在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量
// 同样上边的声明我们可以改成通过 declare + export 声明：

// 变量
declare const name: string;
// 函数
declare function createInstance(): AxiosInstance;
// 接口 接口可以省略 export
interface AxiosInstance {
  // ...
  data: any;
}
// Class
declare class Axios {
  constructor(baseURL: string);
}
// 枚举
enum Directions {
  Up,
  Down,
  Left,
  Right,
}

export { name, createInstance, AxiosInstance, Axios, Directions };
