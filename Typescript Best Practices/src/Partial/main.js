"use strict";
// 巧用 Partial
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var mergeOptions = function (options, patch) {
    return __assign(__assign({}, options), patch);
};
// class MyComponent extends React.PureComponent<Props> {
//     defaultProps: Partial<Props> = {};
// }
