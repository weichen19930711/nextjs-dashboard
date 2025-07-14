/**
 *  使用泛型的方式
 *  we explicitly set Type to be string as one of the arguments to the function cal
 *  use type argument inference
 */
/**
 *
 * @param arg
 * @returns
 */
function identity<Type>(arg: Type): Type {
  return arg;
}
let output = identity<string>('myString'); // we explicitly set Type to be string as one of the arguments to the function call
output = identity('myString'); // use type argument inference

// Working with Generic Type Variables 使用泛型变量
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

// Generic Types
// 泛型函数本身的类型
let myIdentity1: <Type>(arg: Type) => Type = identity;
let myIdentity2: { <Type>(arg: Type): Type } = identity; // 泛型类型写为对象文字类型的调用签名
// interface GenericIdentityFn {
//   <Type>(arg: Type): Type;
// }
// let myIdentity3: GenericIdentityFn = identity;
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
let myIdentity4: GenericIdentityFn<string> = identity;
myIdentity4('cc');

// Generic Classes
/**
 * Generic classes are only generic over their instance side rather than their static side,
 * so when working with classes, static members can not use the class’s type parameter.
 */
class GenericNumber<NumType> {
  zeroValue?: NumType;
  add?: (x: NumType, y: NumType) => NumType;
  //   constructor(zeroValue: NumType, add: (x: NumType, y: NumType) => NumType) {
  //     this.zeroValue = zeroValue
  //     this.add = add
  //   }
}
// This is a pretty literal 非常直观的
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = '';
stringNumeric.add = function (x, y) {
  return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'));

// Generic Constraints
/**
 * Instead of working with any and all types,
 * we’d like to constrain this function to work with any and all types that also  have the .length property
 */
interface Lengthwise {
  length: number;
}
function loggingConstraintsIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
loggingIdentity(3);
loggingConstraintsIdentity({ length: 10, value: 3 });

// Using Type Parameters in Generic Constraints
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key): unknown {
  return obj[key];
}
let xx = { a: '1', b: 2, c: 3, d: 4 };
getProp(xx, 'a');
getProp(xx, 'e');

// Using Class Types in Generics
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = 'Mikle';
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
function createInstance2<A extends Animal>(c: { new (): A }): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance2(Bee).keeper.hasMask;
// Generic Parameter Defaults
// declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
//   element?: T,
//   children?: U
// ): Container<T, U>;

// const div = create();
// const p = create(new HTMLParagraphElement());

// Variance Annotations
/**
 * 差异注释
 *    这是解决非常具体问题的高级功能，仅应在您确定有理由使用它的情况下使用
 * covariance     协方差
 * contravariance 逆变
 */
function func<T>(arg: T) {
  return arg;
}
/**
 * 方差
 * 期待的返回值是 Animal，
 * 实际上 可以返回Cat
 * 因为cat可以赋值给 Animal
 */
interface Producer<T> {
  make(): T;
}
/**
 * 逆变
 * 入参期待的是cat,
 * 实际上 也可以接受Animal
 * 因为cat可以赋值给 Animal
 */
interface Consumer<T> {
  consume: (arg: T) => void;
}

// Contravariant annotation
interface Consumer<in T> {
  consume: (arg: T) => void;
}
// Covariant annotation
interface Producer<out T> {
  make(): T;
}
// Invariant annotation
interface ProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}
