"use strict";
var get = function (url) {
    return fetch(url).then(function (res) { return res.json(); });
};
// 上面的定义极大地增强了代码提示:
get('/user').then(function (user) { return user.name; });
get('/menu').then(function (menu) { return menu.foods; });
