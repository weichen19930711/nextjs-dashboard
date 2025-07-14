function padLeft(padding: number | string, input: string): string {
  /**
   * how TypeScript analyzes runtime values using static types
   * 就像 TypeScript 使用静态类型分析运行时值一样，它将类型分析覆盖在 JavaScript 的运行时控制流结构上
   */
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  }
  return padding + input;
}
padLeft(1, 'a');
// 针对narrowing, TypeScript understands different constructs

// typeof
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === 'string') {
    console.log(strs);
  } else {
    // do nothing
  }
}

// Truthiness narrowing
// both of these result in 'true'
Boolean('hello'); // type: boolean, value: true
!!'world'; // type: true,    value: true

// Equality narrowing
/**
 * 0,NaN,"" (the empty string),0n (the bigint version of zero),null,undefined
 * 这些强制转为false
 */

// The in operator narrowing
type Fish = { swim: () => void; name: string };
type Bird = { fly: () => void; name: string };
type Human = { swim?: () => void; fly?: () => void };
function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }

  return animal.fly();
}
function move2(animal: Fish | Bird | Human) {
  if ('swim' in animal) {
    animal;
  } else {
    animal;
  }
}
// instanceof narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// Assignments
// assignability is always checked against the declared type 始终会 根据 声明类型 检查 可赋值性
let x = Math.random() < 0.5 ? 10 : 'hello world!';
x = 1;
console.log(x);
x = 'goodbye!';
console.log(x);
// x = true;

// Control flow analysis
/**
 * 遇到 type guards and assignments时，TS使用 flow analysis 去缩小范围
 */
function example() {
  let x: string | number | boolean;
  x = Math.random() < 0.5;
  console.log(x);
  if (Math.random() < 0.5) {
    x = 'hello';
    console.log(x);
  } else {
    x = 100;
    console.log(x);
  }
  return x;
}

// Using type predicates
// 直接地控制 类型变化方式
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
declare function getSmallPet(): Fish | Bird;
let pet = getSmallPet();
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === 'sharkey') return false;
  return isFish(pet);
});

// Assertion functions

// Discriminated unions
// 它们非常适合表示 JavaScript 中的任何类型的消息传递方案，例如通过网络发送消息（客户端/服务器通信）
// interface Shape {
//   kind: 'circle' | 'square';
//   radius?: number;
//   sideLength?: number;
// }
// function handleShape(shape: Shape) {
//   if(shape.kind === 'rect') {

//   }
// }

interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}
interface Triangle {
  kind: 'triangle';
  sideLength: number;
}
type Shape = Circle | Square | Triangle; // discriminated union

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    console.log(shape.radius);
    return Math.PI * shape.radius ** 2;
  }
}
function getArea2(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2; // 去掉return 不加 break
  }
}
// The never type

// Exhaustiveness checking
function getArea3(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2; // 去掉return 不加 break
    default:
      const a: never = shape;
      return a; //a 是never 类型的，可以赋值给 number
  }
}
const t: Triangle = {
  kind: 'triangle',
  sideLength: 1,
};
getArea3(t);
