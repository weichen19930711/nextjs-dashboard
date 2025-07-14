function padLeft(padding, input) {
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
function printAll(strs) {
    if (strs && typeof strs === 'object') {
        for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
            var s = strs_1[_i];
            console.log(s);
        }
    }
    else if (typeof strs === 'string') {
        console.log(strs);
    }
    else {
        // do nothing
    }
}
// Truthiness narrowing
// both of these result in 'true'
Boolean('hello'); // type: boolean, value: true
!!'world'; // type: true,    value: true
function move(animal) {
    if ('swim' in animal) {
        return animal.swim();
    }
    return animal.fly();
}
function move2(animal) {
    if ('swim' in animal) {
        animal;
    }
    else {
        animal;
    }
}
// instanceof narrowing
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
// Assignments
// assignability is always checked against the declared type 始终会 根据 声明类型 检查 可赋值性
var x = Math.random() < 0.5 ? 10 : 'hello world!';
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
    var x;
    x = Math.random() < 0.5;
    console.log(x);
    if (Math.random() < 0.5) {
        x = 'hello';
        console.log(x);
    }
    else {
        x = 100;
        console.log(x);
    }
    return x;
}
// Using type predicates
// 直接地控制 类型变化方式
function isFish(pet) {
    return pet.swim !== undefined;
}
var pet = getSmallPet();
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
