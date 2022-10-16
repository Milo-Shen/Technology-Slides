"use strict";
const get = (url) => {
    return fetch(url).then((res) => res.json());
};
// 上面的定义极大地增强了代码提示:
get('/user').then(user => user.name);
get('/menu').then(menu => menu.foods);
function $(id) {
    return document.getElementById(id);
}
