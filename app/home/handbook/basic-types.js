// 请记住：类型注释永远不会改变程序的运行时行为。
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet('Maddison', new Date());
