// 巧用 @ts-expect-error
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments

// 还是类型收窄
// 你和 API 的同事友好地约定了一个接口: 
type Task = {
    status: 'processing';
    progress: number;
} | {
    status: 'done';
    result: string;
};

// 不过说实话，你并不信任他: 
const handleTask = (task: Task) => {
    if (task.status === 'processing') { /* Show progress. */ return; }
    if (task.status === 'done') { /* Show result. */ return; }

    // Defense!
    // window.alert(`Wrong task status: ${task.status}! Go ask Jack!`);
};

// 可惜最后一行报错了，因为类型收窄后 task 的类型为 never, 这是合理的。
// 你可能会考虑用 ts-ignore 或 as any, 但其实 ts-expect-error 更合适: 
const handleTask1 = (task: Task) => {
    if (task.status === 'processing') { /* Show progress. */ return; }
    if (task.status === 'done') { /* Show result. */ return; }

    // Defense!
    // @ts-expect-error
    window.alert(`Wrong task status: ${task.status}! Go ask Bob!`);
};

// 当以后添加 status 时, @ts-expect-error 处会报错，提醒你处理新增的 status: 
type Task1 = Task | { status: 'paused' };

const handleTask2 = (task: Task1) => {
    if (task.status === 'processing') { /* Show progress. */ return; }
    if (task.status === 'done') { /* Show result. */ return; }
    // 当以后添加 status 时, @ts-expect-error 处会报错，提醒你处理新增的 status: 
    if (task.status === 'paused') { /* Show paused. */ return; }

    //   Defense!
    // @ts-expect-error Expect `task` to be never. //   Error.
    window.alert(`Wrong task status: ${task.status}! Go ask Bob!`);
};