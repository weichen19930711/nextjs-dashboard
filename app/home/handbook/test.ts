interface StringNumberPair {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}
const abee: StringNumberPair = ['', 1];
console.log(typeof abee);

// 剩余元素[string, number, ...boolean[]]
function readButtonInput3(args: [string, number, ...boolean[]]) {
  console.log(args);

  const [name, version, ...input] = args;
  // ...
}
function readButtonInput32(...args: [string, number, ...boolean[]]) {
  console.log(args);

  const [name, version, ...input] = args;
  // ...
}
function readButtonInput322(name: string, version: number, ...input: boolean[]) {
  // ...
}
readButtonInput3(['beautiful', 2, true]);
readButtonInput32('beautiful', 2, true);
