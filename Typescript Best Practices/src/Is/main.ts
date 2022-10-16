// 类型收窄（Type guard）能帮我们更好地处理联合类型: 

type Values = number[] | string[];
const isNumberArray = (arr: unknown): arr is number[] => {
    return Array.isArray(arr) && arr.every(value => typeof value === 'number');
};

const handleValues = (values: Values) => {
    if (isNumberArray(values)) {
        values.map(value => value.toFixed(2));
    } else {
        values.map(value => value.length);
    }
};