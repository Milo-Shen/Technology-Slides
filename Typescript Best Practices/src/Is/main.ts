// 类型收窄（Type guard）能帮我们更好地处理联合类型:
// 使用类型谓词 is 来实现之

type Values = number[] | string[];
const isNumberArray = (arr: unknown): arr is number[] => {
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