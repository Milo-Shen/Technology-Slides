import React from 'react';

abstract class Animal extends React.PureComponent {
  /* Common methods here. */
}
class Cat extends Animal {}
class Dog extends Animal {}

// `AnimalComponent` must be a class of Animal.
const renderAnimal = (AnimalComponent: Animal) => {
  // return <AnimalComponent />;        // WRONG!
};

// 上面的代码是错的，因为 Animal 是实例类型，不是类本身。应该:
interface ClassOf<T> {
  new (...args: any[]): T;
}

type Constructor<T> = new (...args: any[]) => T;

const renderAnimal_1 = (AnimalComponent: ClassOf<Animal>) => {
  return <AnimalComponent />; // Good!
};

const renderAnimal_2 = (AnimalComponent: Constructor<Animal>) => {
    return <AnimalComponent />; // Good!
};

renderAnimal_1(Cat); // Good!
renderAnimal_2(Dog); // Good!
