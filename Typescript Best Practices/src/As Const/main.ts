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
