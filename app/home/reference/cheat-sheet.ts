interface JSONResponse {
  version: number;
  (): string;
  //   new (s: string): JSONResponse;
  //   [key: string]: number;
}
// const ccccc = () => {
//   return {} as JSONResponse;
// };
// ccccc['version'] = 1;

// class Test implements JSONResponse {
//   version: number;

//   constructor(v: number) {
//     this.version = v;
//   }
// }
// const cheat: Test = new Test(1);
const cheat2: JSONResponse = (): string => 'cc';
cheat2.version = 1;
console.log(cheat2());

class Bag {
  private name: string; // the prefix private is a type-only addition, has no effect at runtime
  #item: any;
  constructor(email: string) {
    this.#item = 'cccc';
    this.name = 'ffff';
    // this.email = email;
    console.log(this.#item);
  }
}
// class can be used as both a type or a value
const bag: Bag = new Bag('');

/**
 * this in classes
 * the value of 'this' inside a function depends on how the function is called, it is not guraanteed to always be the class instance
 * you can use 'this.parameters', use the bind function, or arrow functions to work around the issue when it occurs
 * 访问this时，不能保证访问的一定是class实例，如果出现问题，请使用bind function or arrow function
 */
