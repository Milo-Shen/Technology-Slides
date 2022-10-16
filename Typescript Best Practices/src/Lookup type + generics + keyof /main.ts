type Food = String;

interface API {
  '/user': { name: string };
  '/menu': { foods: Food[] };
}
const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
  return fetch(url).then((res) => res.json());
};

// 上面的定义极大地增强了代码提示:
get('/user').then(user => user.name);
get('/menu').then(menu => menu.foods);
