// 巧用查找类型

interface MyPerson {
  addr: {
    city: string;
    street: string;
    num: number;
  };
}

// 当需要使用 addr 的类型时，除了把类型提出来
interface Address {
  city: string;
  street: string;
  num: number;
}

interface MyPerson {
  addr: Address;
}

// 还可以写成
type c = MyPerson['addr'];
