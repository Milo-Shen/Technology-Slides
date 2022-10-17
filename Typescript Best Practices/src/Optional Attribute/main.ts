// 可选属性

// 将具有内部逻辑关系的属性定义为可选属性
interface Product {
    id: string,
    type: 'digital' | 'physical',
    weight_in_kg?: number,
    size_in_mb?: number
}

let product_1: Product = {
    id: 'id',
    type: "digital",
    size_in_mb: 10000
};

// 应该怎么做
// 清晰的表达内部逻辑关系，如果是 digital 则应该存在 weight_in_kg 属性，如果是 physical 则应该存在 size_in_mb 属性

interface Product1 {
    id: string,
    type: 'digital' | 'physical',
}

interface DigitalProduct extends Product1 {
    type: 'digital',
    size_in_mb: number
}

interface PhysicalProduct extends Product1 {
    type: 'physical',
    weight_in_kg: number
}

// 将属性定义为可选比分割代码更容易，代码量也更少，如果需求发生变化，它也 可以很方便的修改。
// 类型系统的最大好处是它们可以用编译时检查代替运行时检查。使用更合理的类型，可以在编译时检查可能会被忽视的错误，例如通过确保每个 DigitalProduct 都有一个 size_in_mb

let product_2: DigitalProduct = {
    id: 'id',
    type: "digital",
    size_in_mb: 10000
};