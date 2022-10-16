// 巧用类型查找 + 类方法
// 我们通常会在 React 组件中把方法传下去

import React from "react";

class Parent extends React.PureComponent {
    private updateHeader = (title: string, subTitle: string) => {
        // 直达实现
        // 其实还是跳转到方法的签名，只不过方法的签名和方法的实现在一起罢了
    };
    render() {
        return <Child updateHeader={this.updateHeader} />;
    }
}

interface ChildProps {
    // 跳转到方法的签名, 找不到方法的实现
    updateHeader: (title: string, subTitle: string) => void;
}
class Child extends React.PureComponent<ChildProps> {
    private onClick = () => {
        this.props.updateHeader('Hello', 'Typescript');
    };
    render() {
        return <button onClick={this.onClick}>Go</button>;
    }
}

// 其实可以在 ChildProps 中直接引用类的方法
interface ChildProps1 {
    // 跳转到方法的签名, 找不到方法的实现
    updateHeader: Parent["updateHeader"]
}
class Child1 extends React.PureComponent<ChildProps1> {
    private onClick = () => {
        this.props.updateHeader('Hello', 'Typescript');
    };
    render() {
        return <button onClick={this.onClick}>Go</button>;
    }
}