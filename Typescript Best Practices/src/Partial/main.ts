// 巧用 Partial

const mergeOptions = (options: Opt, patch: Partial<Opt>) => {
    return { ...options, ...patch };
}

interface Props {
    name: string
}

// 将一个类型中的所有属性都变成可选属性
let defaultState = {
    foo: 7,
    bar: 'hello'
};

type PartialState = Partial<typeof defaultState>;

let partialState: PartialState = {
    foo: 8
};

// class MyComponent extends React.PureComponent<Props> {
//     defaultProps: Partial<Props> = {};
// }
