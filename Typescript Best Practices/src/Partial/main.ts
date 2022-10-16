// 巧用Partial

const mergeOptions = (options: Opt, patch: Partial<Opt>) => {
    return { ...options, ...patch };
}

interface Props {
    name: string
}

// class MyComponent extends React.PureComponent<Props> {
//     defaultProps: Partial<Props> = {};
// }
