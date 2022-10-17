// 类型守卫

interface Product {
    id: string,
    type: 'digital' | 'physical',
    weight_in_kg?: number,
    size_in_mb?: number
}

// 为 as 做一个前置守卫, 例如(ps：注意 is的使用方法): 
function isArrayOfProducts(obj: unknown): obj is Product[] {
    return Array.isArray(obj) && obj.every(isProduct);
}

function isProduct(obj: unknown): obj is Product {
    return obj !== null && typeof (obj as Product).id === 'string'
}

async function loadProducts(): Promise<Product[]> {
    const response = await fetch('https://api.mysite.com/products');
    const products: unknown = await response.json();
    if (!isArrayOfProducts(products)) {
        throw new TypeError('Reveive error API response');
    }

    return products;
}