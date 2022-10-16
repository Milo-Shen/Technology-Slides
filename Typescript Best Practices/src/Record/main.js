"use strict";
// 巧用 Record 类型
var AnimalMap = {
    cat: { name: '猫', icon: ' ' },
    dog: { name: '狗', icon: ' ' },
    frog: { name: '蛙', icon: '' }
};
// 如果你喜欢用 enum ，写法也一样的
var AnimalType2;
(function (AnimalType2) {
    AnimalType2["CAT"] = "cat";
    AnimalType2["DOG"] = "dog";
    AnimalType2["FROG"] = "frog";
})(AnimalType2 || (AnimalType2 = {}));
var AnimalMap2 = {
    cat: { name: '猫', icon: ' ' },
    dog: { name: '狗', icon: ' ' },
    frog: { name: '蛙', icon: '' }
};
