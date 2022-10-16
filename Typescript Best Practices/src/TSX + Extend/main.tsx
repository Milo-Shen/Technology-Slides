// 在 .tsx 文件里，泛型可能会被当做 jsx 标签
// const toArray = <T>(element: T) => [element];

// 使用 T extends {} 解决上述问题
const toArray = <T extends {}>(element: T) => [element];
