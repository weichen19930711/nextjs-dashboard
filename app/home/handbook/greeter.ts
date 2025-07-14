/**
 * Compiling your code
 * 换句话说，它是一个在代码运行前运行（静态）的工具，并确保程序的类型正确
 */

interface Person {
  firstName: string;
  lastName: string;
}

class Student {
  fullName: string;

  constructor(
    public firstName: string, //给this.firstName
    middleInitial: string,
    public lastName: string,
  ) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
  //
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName;
}

let user = 'Jane User';

let student = new Student('Jane', 'M.', 'User');
// user = [0, 1, 2]; // Type 'number[]' is not assignable to type 'string'.
document.body.textContent = greeter(student);
