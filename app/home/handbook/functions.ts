// Function Type Expressions
function greeter(fn: (a: string) => void) {
  fn('Hello, World');
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

// call signatures
type DescribableFunction = {
  description: string;
  (someArg: number): boolean; // 和 function type expression相比，语法有改动，
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + 'retured ' + fn(6));
}
function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = 'ss';
// myFunc.
doSomething(myFunc);

// Construct Signatures
interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date; //
}
function func(ctor: CallOrConstruct) {
  console.log(ctor(10));
  console.log(new ctor('10'));
}
func(Date);

// Generic Functions 泛型函数
function firstElement(arr: any[]) {
  return arr[0];
}
/**
 * In TypeScript, generics are used when we want to describe a correspondence between two values.
 * We do this by declaring a type parameter in the function signature:
 * @param arr
 * @returns
 */
function firstElementGeneric<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// s is of type 'string'
const ss = firstElementGeneric(['a', 'b', 'c']);
// n is of type 'number'
const nn = firstElementGeneric([1, 2, 3]);
// u is of type undefined
const uu = firstElementGeneric([]);

// inference 推理
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
const parsedArr = map(['1', '2', '3'], (n) => parseInt(n));

// Constraints
// Remember, generics are all about relating two or more values with the same type!
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest('alice', 'bob');
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);

interface Animal {
  name: string;
}
interface Dog extends Animal {
  bark(): void;
}
type MyGeneric<T extends Animal = Animal> = T;
// Using the default type
let animal1: MyGeneric = { name: 'Generic Animal' }; // T defaults to Animal
// Explicitly specifying a type
let dog1: MyGeneric<Dog> = { name: 'Buddy', bark: () => console.log('Woof!') }; // T is Dog

// Working with Constrained Values
function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // the function promises to return the same kind of object as was passed in, not just some object matching the constraint.
    return { length: minimum };
  }
}
// 如果‘return { length: minimum };’编译通过，下面代码执行时就会出错
const arr = minimumLength([1, 2, 3], 6);
console.log(arr.slice(0));

// Specifying Type Arguments 主动指定Type Argument
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// const arr1 = combine([1, 2, 3], ["hello"]);
const arr2 = combine<string | number>([1, 2, 3], ['hello']);
// Type Parameters Should Appear Twice
// 规则：如果类型参数仅出现在一个位置，请强烈重新考虑是否确实需要它

// Optional Parameters

// 在为回调编写函数类型时，切勿编写可选​​参数，除非您打算在不传递该参数的情况下调用该函数
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed());
});

// Function Overloads
/**
 * 1 实现function 对外是不可见的
 * 2 When writing an overloaded function, you should always have two or more signatures above the implementation of the function.
 * 3 尽可能优先使用联合类型的参数，而不是重载
 * @param timestamp
 */
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
len(''); // OK
len([0]); // OK
len(Math.random() > 0.5 ? 'hello' : [0]);

// Declaring this in a Function
declare function getDB(): DB;
type User = {
  age: number;
  sex: string;
  name: string;
  admin: boolean;
};
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});

// 其他需要了解的类型
/**
 * void 表示无返回值的函数的返回值。当函数没有任何return语句
 * 在TS中，void is not the same as undefined.
 * @returns
 */
function noop() {
  return; // The inferred return type is void
}

// Rest Parameters and Arguments
//剩余参数默认是any[], 指定的话 ，必须是 Array<T> or T[] or a tuple type
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const aaa = multiply(10, 1, 2, 3, 4);
const arr111 = [1, 2, 3];
const arr222 = [4, 5, 6];
arr111.push(...arr222); //解构语法

// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
// A spread argument must either have a tuple type or be passed to a rest parameter.
// 解决办法是 const args = [8, 5] as const;
const angle = Math.atan2(...args); // Math.atan2只接受两个数字，args长度可能有多个

// Parameter Destructuring

// Assignability of Functions

type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};
const f2: voidFunc = () => true;
const f3: voidFunc = function () {
  return true;
};
const v1 = f1();
console.log(v1);
