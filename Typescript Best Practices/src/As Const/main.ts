const fetchOption = {
    mode: 'same-origin',
    credentials: 'include',
};

// fetch('/api', fetchOption);     // Error!

// 这因为 mode 的类型被推导为 string 而不是 'same-origin' ，credentials 同理。
// 推荐的做法是声明合理的类型: 
const fetchOptions: RequestInit = {
    mode: 'same-origin',
    credentials: 'include',
};
fetch('/api', fetchOptions);

// 如果要的类型很难取到，可以
const fetchOptions1 = {
    mode: 'same-origin',
    credentials: 'include',
} as const;

fetch('/api', fetchOptions1);

// 或是
const fetchOptions2 = {
    mode: 'same-origin' as const,
    credentials: 'include' as const,
};
fetch('/api', fetchOptions2);

// 巧用 [a, b] as const
// React.useState() 返回[state, setState] 的结构，方便调用方解构和命名：
const [title, setTitle] = React.useState();

// 这是一种很棒的设计，我们也效仿的话: 
const makeGetSet = (initialValue: string) => {
    let value = initialValue;
    const setValue = (v: string) => value = v;
    const getValue = () => value;
    return [getValue, setValue];
};

const [getName, setName] = makeGetSet('14');
// const currentName = getName(); // Error! But why?
// 原因是 [0, ''] 会被推导为类型 (number | string)[] 。加 as const 可推断为元组: 

const toGetSet = (initialValue: string) => {
    let value = initialValue;
    const setValue = (v: string) => value = v;
    const getValue = () => value;
    return [getValue, setValue] as const;
};

const [getName1, setName1] = toGetSet('14');
const currentName = getName1(); // Great!

// 业务中，自定义 hook 比较多用:
const useFlag = (initialValue = false) => {
    const [flag, setFlag] = React.useState(initialValue);
    const up = React.useCallback(() => setFlag(true), []);
    const down = React.useCallback(() => setFlag(false), []);
    return [flag, up, down] as const;
};

const [modalVisible, showModal, hideModal] = useFlag();