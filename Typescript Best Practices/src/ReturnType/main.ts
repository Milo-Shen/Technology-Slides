function getState() {
    return {
        foo: 7,
        bar: 'hello'
    };
}

type State = ReturnType<typeof getState>;

let nextState: State = {
    foo: 8,
    bar: 'world'
};