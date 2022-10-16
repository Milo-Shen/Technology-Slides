// 巧用 Pick 和 Omit

interface User {
    uid: number;         // 用户ID  
    username: string;    // 用户名  
    password: string;    // 密码  
    email: string;       // 邮箱  
    residence: string;   // 居住地  
    job: string;         // 职业  
    sex: number;         // 性别  
    birthday: string;    // 生日
}

// Pick 的例子
type RegisterArgs = Pick<User, 'username' | 'email' | 'password'>
function getRegisterArgs(args: RegisterArgs) { }
let user_1: RegisterArgs = {
    username: 'milo shen',
    email: 'xxx@163.com',
    password: 'password'
}

getRegisterArgs(user_1);

// Omit 的例子
type UnRegisterArgs = Omit<User, 'username' | 'password' | 'email' | 'residence' | 'job' | 'sex' | 'birthday'>
let user_2: UnRegisterArgs = {
    uid: 10000
}
function getUnRegisterArgs(args: UnRegisterArgs) { }
getUnRegisterArgs(user_2);
