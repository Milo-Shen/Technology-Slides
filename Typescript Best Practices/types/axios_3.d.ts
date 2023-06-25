// export namespace
// 与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象：

// 导出一个 Axios 的命名空间
export namespace Axios {
  const name: string;
  namespace AxiosInstance {
    function getUrl(): string;
  }
}

// xx.ts
// import { Axios } from 'axios';
Axios.AxiosInstance.getUrl();