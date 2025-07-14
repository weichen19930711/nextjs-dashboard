/**
 *  object types.
 * 1 匿名的
 * 2 interface 定义name
 * 3 起别名 type
 */
// Property Modifiers
/**
 * 属性修饰
 * 1 the type
 * 2 是否是可选的
 * 3 是否是可写入的
 */
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos; // when we do under strictNullChecks,
  let xPos2 = opts.xPos === undefined ? 0 : opts.xPos; // narrow
}
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log('x coordinate at', xPos);
  console.log('y coordinate at', yPos);
}

// readonly
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop = 'hello'; // Cannot assign to 'prop' because it is a read-only property.
}

// index signatures
declare function getStringArray(): StringArray;
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

// extending types
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

// Intersection Types
/**
 * TypeScript provides another construct called intersection types that is mainly used to combine existing object types.
 */
interface Colorful {
  color: string;
}
interface Circle2 {
  radius: number;
}

type ColorfulCircle = Colorful & Circle2;
function draw(circle: ColorfulCircle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: 'blue', radius: 42 });

// oops
draw({ color: 'red', raidus: 42 });

// Interface Extension vs. Intersection

// Generic Object Types
interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}
let boxA: Box<string> = { contents: 'hello' };
boxA.contents;
let boxB: StringBox = { contents: 'world' };
boxB.contents;
interface Apple {
  // ....
}
type AppleBox = Box<Apple>;

//type aliases can also be generic 类型别名也可以是泛型的
type Boxs<Type> = {
  contents: Type;
};
// The Array Type;
// 容器类型(The Array Type) 工作 与 type(string)是 无关的
// 所以string[]可以等级与Array<string>，不管怎样去使用 容器类型
function doSomething(value: Array<string>) {
  // ...
}
let myStrArray: string[] = ['hello', 'world'];
// either of these work!
doSomething(myStrArray);
doSomething(new Array('hello', 'world'));

// The ReadonlyArray; Type;
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push('hello!'); // Property 'push' does not exist on type 'readonly string[]'.
}
const roArray: ReadonlyArray<string> = ['red', 'green', 'blue'];

// tuple type 元组类型
function doSomething(pair: [string, number]) {
  const a = pair[0];
  const b = pair[1];
  const [inputString, hash] = pair;
}
doSomething(['hello', 42]);

interface StringNumberPair {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}
const aee: StringNumberPair = ['', 1];
console.log(typeof aee); // Array.isArray(aee) true

type Either2dOr3d = [number, number, number?]; //Optional tuple elements can only come at the end
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  console.log(coord.length);
}
// rest elements 剩余元素
// 不需要设置 length属性
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
const ta: StringNumberBooleans = ['hello', 1];
const tb: StringNumberBooleans = ['beautiful', 2, true];
const tc: StringNumberBooleans = ['world', 3, true, false, true, false, true];

// 剩余元素[string, number, ...boolean[]]
// args是数组
function readButtonInput(args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
// args也是数组
function readButtonInput2(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
function readButtonInput22(name: string, version: number, ...input: boolean[]) {
  // ...
}
readButtonInput(['beautiful', 2, true]);
readButtonInput2('beautiful', 2, true);
