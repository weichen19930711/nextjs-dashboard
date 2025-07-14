// 请记住：类型注释永远不会改变程序的运行时行为。
function greet2(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet2('Maddison', new Date());
