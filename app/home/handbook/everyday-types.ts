declare function getInput(): string;
declare function sanitize(str: string): string;
declare function getBear(): Bear;
declare function getOrchid(): Orchid;
/**
 * core concept
 *  runtime checking
 */
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';

const n: number = obj;
function fn(s: any) {
  // No error?
  console.log(s.subtr(3));
}
fn(42);

function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}
// greet(42);

function getFavoriteNumber(): number {
  return 26;
}
//返回 Promise 的函数
async function getAsyncFavoriteNumber(): Promise<number> {
  return 26;
}

// 匿名函数
// 上下文类型
const names = ['Alice', 'Bob', 'Eve'];
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

// 对象类型 如果你没有给属性指定number类型，则系统会默认为any
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// 可选属性
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  //   console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }
  console.log(obj.last?.toUpperCase());
}
// Both OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });

// 联合类型
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}
// OK
printId(101);
// OK
printId('202');
// Error
// printId({ myID: 22342 });
function printTextOrNumberOrBool(textOrNumberOrBool: string | number | boolean) {
  console.log(textOrNumberOrBool);
}

type Point = {
  x: number;
  y: number;
};
function printCoord2(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });

type UserInputSanitizedString = string;
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
let userInput = sanitizeInput(getInput());
userInput = 'ccccc';

// 接口
interface AreaPoint {
  x: number;
  y: number;
}
//anonymous object type
function printCoord3(pt: AreaPoint) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

//
/**
 * Almost all features of an interface are available in type
 * 类型别名和接口之间的区别
 *  关键区别在于类型无法重新打开以添加新属性，而接口始终可扩展
 */
// 接口扩展
interface Animal {
  name: string;
}
interface Bear extends Animal {
  honey: boolean;
}
const bear = getBear();
bear.name;
bear.honey;
// 类型扩展
type Plant = {
  name: string;
};
type Orchid = Plant & {
  honey: boolean;
};
const orchid = getOrchid();
orchid.name;
orchid.honey;

// 类型断言
/**
 * 有时您会获得 TypeScript 无法了解的值类型的信息 document.getElementById
 *      1 TypeScript 只知道这将返回某种HTMLElement
 */
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
// 和下面注释等价（在tsx不能这样写）
// <HTMLCanvasElement>document.getElementById("main_canvas");
const a = 'expr' as any as string;

// 字面量联合类型 type 'GET' | 'POST'
declare function handleRequest(url: string, method: 'GET' | 'POST'): void;
const req = { url: 'https://example.com', method: 'GET' };
// req.method被推断为string，string不能直接赋值给 method
handleRequest(req.url, req.method);

// 方式 1:
const req2 = { url: 'https://example.com', method: 'GET' as 'GET' };
handleRequest(req2.url, req2.method);
// 方式 1:
const req3 = { url: 'https://example.com', method: 'GET' };
handleRequest(req2.url, req2.method as 'GET');

// 方式 2: const但对于类型系统而言，它确保所有属性都被分配文字类型，而不是更通用的版本，如string或number。
const req4 = { url: 'https://example.com', method: 'GET' } as const;
handleRequest(req4.url, req4.method);

// null和undefined
// strictNullChecks 关闭
// 关闭时，值可能或仍然可以正常访问，并且这些值可以赋值给任何类型的属性
// strictNullChecks 打开
function doSomething(x: string | null) {
  // 缩小范围
  if (x === null) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase());
  }
}
//非空断言运算符（后缀!）
function liveDangerously(x: number | null) {
  // No error 断言该值不是null或undefined,断言后，ts认为是正常的
  console.log(x!.toFixed());
}
liveDangerously(null);

const firstNamesss = Symbol('name');
const secondNamesss = Symbol('name');

if (firstNamesss === secondNamesss) {
  // Can't ever happen
}
