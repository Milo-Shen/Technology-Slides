// 巧用 [number] 下标

type Drink = 'Beer' | 'Wine' | 'Water';

// 以及一个全量的数组，和一个阻止酒吧爆炸的方法:
const DRINK_LIST: Drink[] = ['Beer', 'Wine', 'Water'];
const checkDrink = (drink: any): drink is Drink => {
  return DRINK_LIST.includes(drink);
};

// 但这并不能保证 DRINK_LIST 是枚举值的全量列表:
const DRINK_LIST1: Drink[] = ['Beer', 'Wine']; // Oh, I forgot water!

// 或许有某种技巧能定义出期望的全量列表元组。
// 但这里提供一种简便的写法 —— 先定义全量列表，再获取枚举类型:
// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
const DRINK_LIST2 = ['Beer', 'Wine', 'Water'] as const;
type Drink2 = (typeof DRINK_LIST)[number]; // Equals to 'Beer' | 'Wine' | 'Water'.
