// 类型收窄（Type guard）能帮我们更好地处理联合类型:

// 使用类型谓词 is 来实现之
// 所谓 is 关键字其实更多用在函数的返回值上，用来表示对于函数返回值的类型保护

type Values = number[] | string[];
const isNumberArray = (arr: unknown): arr is number[] => {
    // 通常我们使用 is 关键字（类型谓词）在函数的返回值中，从而对于函数传入的参数进行类型保护
    return Array.isArray(arr) && arr.every(value => typeof value === 'number');
};

const handleValues = (values: Values) => {
    if (isNumberArray(values)) {
        // 这个分支里的 value 为 number[];
        values.map(value => value.toFixed(2));
    } else {
        // 这个分支里的 value 为 string[];
        values.map(value => value.length);
    }
};