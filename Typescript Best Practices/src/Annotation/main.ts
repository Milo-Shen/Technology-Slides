// 巧用注释

/** A cool guy. */
interface Person {
  /** A cool name. */
  name: string;
}

// 通过/** */形式的注释可以给 TS 类型做标记，编辑器会有更好的提示:
const p: Person = {
  name: '24',
};

// 巧用注释 进阶
// 注释有很多规范的字段，基本和 JSDOC 一致。但不用着急翻文档，在 /** */ 里输入 @ 就可以看到丰富的选择：

/**
 * @deprecated
 * @param a
 */
const f = (a: string) => a;
