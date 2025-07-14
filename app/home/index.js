/**
 * Rest Parameters
 *   function 剩余参数
 *   剩余参数应该是最后一个参数
 *
 * 使用场景
 *   当你不确定函数需要多少个参数时。
 *   需要将参数作为数组处理时。
 *   实现可变数量的参数传递功能。
 * @param  {...any} args
 */
function ccc(...args) {
  console.log(args);
}
function bbb(args) {
  console.log(args);
}
ccc(); // []
ccc(1); // [1]
bbb(); // undefined
bbb(1); // 1

class C {
  constructor(a, b) {}
}

const c = new C(1, "c");
console.log(typeof Object.getPrototypeOf(c).constructor === typeof C);
