// keyof 关键字
// 所谓 keyof 关键字代表它接受一个对象类型作为参数，并返回该对象所有 key 值组成的联合类型。

interface IProps {
    name: string;
    age: number;
    sex: string;
}

// Keys 类型为 'name' | 'age' | 'sex' 组成的联合类型
type Keys = keyof IProps;

// keyof any 的类型为 string | number | symbol
type AnyKeys = keyof any

function getValueFromKeyError(obj: object, key: string) {
    // throw error
    // key 的值为 string 代表它仅仅只被规定为字符串
    // TS 无法确定 obj 中是否存在对应的key
    // return obj[key];
}

// 下面是一个泛型约束和 keyof 共同作用的一个例子
// 函数接受两个泛型参数
// T 代表 object 的类型，同时 T 需要满足约束是一个对象
// K 代表第二个参数 K 的类型，同时 K 需要满足约束 keyof T
// keyof T 代表 object 中所有 key 组成的联合类型
// 自然，我们在函数内部访问 obj[key] 就不会提示错误了
function getValueFromKey<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}