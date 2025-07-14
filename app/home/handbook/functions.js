// Function Type Expressions
function greeter(fn) {
  fn('Hello, World');
}
function printToConsole(s) {
  console.log(s);
}
greeter(printToConsole);
function doSomething(fn) {
  console.log(fn.description + 'retured ' + fn(6));
}
function myFunc(someArg) {
  return someArg > 3;
}
myFunc.description = 'ss';
// myFunc.
doSomething(myFunc);
function func(ctor) {
  console.log(ctor(10));
  console.log(new ctor('10'));
}
func(Date);
// Generic Functions 泛型函数
function firstElement(arr) {
  return arr[0];
}
/**
 * In TypeScript, generics are used when we want to describe a correspondence between two values.
 * We do this by declaring a type parameter in the function signature:
 * @param arr
 * @returns
 */
function firstElementGeneric(arr) {
  return arr[0];
}
// s is of type 'string'
var ss = firstElementGeneric(['a', 'b', 'c']);
// n is of type 'number'
var nn = firstElementGeneric([1, 2, 3]);
// u is of type undefined
var uu = firstElementGeneric([]);
// inference 推理
function map(arr, func) {
  return arr.map(func);
}
var parsedArr = map(['1', '2', '3'], function (n) {
  return parseInt(n);
});
// Constraints
// Remember, generics are all about relating two or more values with the same type!
function longest(a, b) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
// longerArray is of type 'number[]'
var longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
var longerString = longest('alice', 'bob');
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);
// Working with Constrained Values
function minimumLength(obj, minimum) {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // the function promises to return the same kind of object as was passed in, not just some object matching the constraint.
    return { length: minimum };
  }
}
// 如果‘return { length: minimum };’编译通过，下面代码执行时就会出错
var arr = minimumLength([1, 2, 3], 6);
// console.log(arr.slice(0));
// Specifying Type Arguments 主动指定Type Argument
function combine(arr1, arr2) {
  return arr1.concat(arr2);
}
// const arr1 = combine([1, 2, 3], ["hello"]);
var arr2 = combine([1, 2, 3], ['hello']);
// Type Parameters Should Appear Twice
// 规则：如果类型参数仅出现在一个位置，请强烈重新考虑是否确实需要它
// Optional Parameters
// 在为回调编写函数类型时，切勿编写可选​​参数，除非您打算在不传递该参数的情况下调用该函数
function myForEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
myForEach([1, 2, 3], function (a, i) {
  console.log(i.toFixed());
});
function makeDate(mOrTimestamp, d, y) {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
var d1 = makeDate(12345678);
var d2 = makeDate(5, 5, 5);
function len(x) {
  return x.length;
}
len(''); // OK
len([0]); // OK
len(Math.random() > 0.5 ? 'hello' : [0]);
// var db = getDB();
// var admins = db.filterUsers(function () {
//   return this.admin;
// });
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
function multiply(n) {
  var m = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    m[_i - 1] = arguments[_i];
  }
  return m.map(function (x) {
    return n * x;
  });
}
// 'a' gets value [10, 20, 30, 40]
var aaa = multiply(10, 1, 2, 3, 4);
var arr111 = [1, 2, 3];
var arr222 = [4, 5, 6];
arr111.push.apply(arr111, arr222); //解构语法
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
var args = [8, 5];
// A spread argument must either have a tuple type or be passed to a rest parameter.
// 解决办法是 const args = [8, 5] as const;
var angle = Math.atan2.apply(Math, args); // Math.atan2只接受两个数字，args长度可能有多个
var f1 = function () {
  return true;
};
var f2 = function () {
  return true;
};
var f3 = function () {
  return true;
};
var v1 = f1();
console.log(v1);
