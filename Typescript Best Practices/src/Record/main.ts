// 巧用 Record 类型

// type AnimalType = 'cat' | 'dog' | 'frog';
// const AnimalMap = {
//     cat: { name: '猫', icon: ' ' },
//     dog: { name: '狗', icon: ' ' },
//     forg: { name: '蛙', icon: ' ' },
// };

// 注意到上面 forg 拼错了吗？
// Record 可以保证映射完整: 

type AnimalType = 'cat' | 'dog' | 'frog';
interface AnimalDescription { name: string, icon: string }
const AnimalMap: Record<AnimalType, AnimalDescription> = {
    cat: { name: '猫', icon: ' ' },
    dog: { name: '狗', icon: ' ' },
    frog: { name: '蛙', icon: '' }
};

// 如果你喜欢用 enum ，写法也一样的
enum AnimalType2 {
    CAT = 'cat',
    DOG = 'dog',
    FROG = 'frog',
}
const AnimalMap2: Record<AnimalType2, AnimalDescription> = {
    cat: { name: '猫', icon: ' ' },
    dog: { name: '狗', icon: ' ' },
    frog: { name: '蛙', icon: '' }
};