// function classMembers() {
//   class Points {
//     x: number = 0;
//     y: number = 1;
//     z = 0;
//   }
//   const pt = new Points();
//   pt.x = 0;
//   pt.y = 0;
//   pt.z = '0'; // 已经推断为number

//   class GoodGreeter {
//     name: string;
//     readonly age: number = 1; // 只能在构造函数中修改

//     constructor(age?: number) {
//       this.name = 'hello';
//       if (age) {
//         this.age = age;
//       }
//     }
//   }
//   const goodGreeter = new GoodGreeter();
//   console.log(goodGreeter.name);
//   goodGreeter.age = 1;
// }
// // classMembers()

// // method
// function classMethod() {
//   let o = 0;
//   class C {
//     o: string = 'hell0';
//     _length = 0;
//     m() {
//       this.o = 'w'; // Type 'string' is not assignable to type 'number'
//     }
//     get length() {
//       return this._length;
//     }
//     set length(value) {
//       this._length = value;
//     }
//   }
//   // getter and setter
//   class Thing {
//     _size = 0;
//     get size(): number {
//       return this._size;
//     }
//     set size(value: string | number | boolean) {
//       let num = Number(value);
//       if (!Number.isFinite(num)) {
//         this._size = 0;
//         return;
//       }
//       this._size = num;
//     }
//   }
// }
// // classMethod()

// // Class Heritage
// function classHeritage() {
//   interface Checkable {
//     check(name: string): boolean;
//   }
//   class NumberChecker implements Checkable {
//     check(s: any) {
//       return s.toLowerCase() === 'ok';
//     }
//   }
//   interface AC {
//     x: number;
//     y?: number;
//   }
//   class CC implements AC {
//     x = 0;
//   }
//   const c = new CC();
//   c.y = 10;
// }
// // classHeritage()

// extends Clauses
/**
 * 1The base class fields are initialized
 * 2The base class constructor runs
 * 3The derived class fields are initialized
 * 4The derived class constructor runs
 */
function classExtends() {
  class Base {
    name = 'base';
    constructor() {
      console.log('My name is ' + this.name);
    }
    greet() {
      console.log('hello world!');
    }
  }
  class Derived extends Base {
    name = 'derived';
    // greet方法符合Base的greet,实现了override
    greet(name?: string) {
      if (name === undefined) {
        super.greet();
      } else {
        console.log(`hello ${name.toUpperCase()}`);
      }
    }
  }
  const d = new Derived();
  d.greet();
  d.greet('cccc');
  // 多态
  const b: Base = d;
  b.greet();
}
// classExtends();

// Member Visibility
/**
 * 默认是public的。
 */
function classMemberVisibility() {
  class Greeter {
    public greet() {
      console.log('hi!');
    }
    protected getName() {
      return 'hi';
    }
  }
  class SpecialGreeter extends Greeter {
    public howdy() {
      console.log('Howdy: ' + this.getName());
    }
  }
  const g = new Greeter();
  g.greet();
  const sg = new SpecialGreeter();
  sg.greet();
  // sg.getName(); //  only accessible within class 'Greeter' and its subclasses

  // 暴露protected merber
  class Base {
    private x = 0;
    protected m = 10;
  }
  class Derived extends Base {
    m = 15; // No modifier, so default is 'public'
    showX() {
      // console.log(this.x); // private merber Can't access in subclasses
    }
  }
  const d = new Derived();
  console.log(d.m); // OK

  const b = new Base();
  // console.log(b.x); // private merber can't access from outside the class

  // 跨实例访问private
  class A {
    private x = 10;
    public sameAs(other: A) {
      return other.x === this.x; // No error
    }
  }

  class MySafe {
    private secretKey = 12345;
  }
  const s = new MySafe();
  // console.log(s.secretKey); // Not allowed during type checking
  console.log(s['secretKey']); // OK
}
// classMemberVisibility();

// Static Members

// Generic Classes
function genericClass() {
  class Box<Type> {
    contents: Type;
    constructor(value: Type) {
      this.contents = value;
    }
  }
  const b = new Box('ss');
  console.log(b.contents);
}
// genericClass();

// this at Runtime in Classes
/**
 * TypeScript 不会改变 JavaScript 的运行时行为，并且 JavaScript 因具有一些特殊的运行时行为而闻名。
 */
function thisRuntimeClass() {
  class MyClass {
    name = 'MyClass';
    getName() {
      return this.name;
    }
    getArrawName = () => {
      return this.name;
    };
    /**
     * TS对于this的指向
     * @param this
     * @returns
     */
    getParmThisName(this: MyClass) {
      return this.name;
    }
  }
  const c = new MyClass();
  const obj = {
    name: 'obj',
    getName: c.getName,
    getArrawName: c.getArrawName,
  };

  // Prints "obj", not "MyClass"
  console.log(obj.getName());
  console.log(obj.getArrawName());
  c.getParmThisName();

  const g = c.getParmThisName;
  // console.log(g());
}
thisRuntimeClass();

// this Types
function thisTypes() {
  class FileSystemObject {
    isFile(): this is FileRep {
      return this instanceof FileRep;
    }
    isDirectory(): this is Directory {
      return this instanceof Directory;
    }
    isNetworked(): this is Networked & this {
      return this.networked;
    }
    constructor(
      public path: string,
      private networked: boolean,
    ) {}
  }
  class FileRep extends FileSystemObject {
    constructor(
      path: string,
      public content: string,
    ) {
      super(path, false);
    }
  }
  class Directory extends FileSystemObject {
    children: FileSystemObject[] = [];
  }
  interface Networked {
    host: string;
  }

  const fso: FileSystemObject = new FileRep('foo/bar.txt', 'foo');
  if (fso.isFile()) {
    fso.content;
  } else if (fso.isDirectory()) {
    fso.children;
  } else if (fso.isNetworked()) {
    fso.host;
  }

  class Box<T> {
    value?: T;
    hasValue(): this is { value: T } {
      return this.value !== undefined;
    }
  }
  const bopx = new Box<string>();
  bopx.value = 'GameBoy';
  bopx.value;
  if (bopx.hasValue()) {
    bopx.value;
  }
}

function paramProperties() {
  class Params {
    constructor(
      public readonly x: number,
      protected y: number,
      private z: number,
    ) {
      // No body necessary
    }
  }
  const a = new Params(1, 2, 3);
  console.log(a.x);
  // console.log(a.z);
}
paramProperties();

function constructorSign() {
  class Point {
    createdAt: number;
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.createdAt = Date.now();
      this.x = x;
      this.y = y;
    }
  }
  type PointInstance = InstanceType<typeof Point>;
  function moveRight(point: PointInstance) {
    point.x += 5;
  }
  const p = new Point(1, 3);
  moveRight(p);
  console.log(p.x);
}
// constructorSign();

// Abstract Classes and Members
function abstractClass() {
  abstract class Base {
    abstract getName(): string;

    printName() {
      console.log(`hello, ${this.getName()}`);
    }
  }

  class Derived extends Base {
    getName(): string {
      return 'world';
    }
  }
  const d = new Derived();
  d.printName();

  function greet(ctor: new () => Base) {
    const instance = new ctor();
    instance.printName();
  }
  greet(Derived);
}
abstractClass();
