"use strict";
// 巧用 Pick 和 Omit
function getRegisterArgs(args) { }
var user_1 = {
    username: 'milo shen',
    email: 'xxx@163.com',
    password: 'password'
};
getRegisterArgs(user_1);
var user_2 = {
    uid: 10000
};
function getUnRegisterArgs(args) { }
getUnRegisterArgs(user_2);
