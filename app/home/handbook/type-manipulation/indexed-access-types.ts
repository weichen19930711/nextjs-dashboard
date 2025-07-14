/**
 * We can use an indexed access type to look up a specific property on another type:
 */

type PersonChina = { age: number; name: string; alive: boolean };
type Age = PersonChina['age']; // 'age'是一个 type
type I1 = PersonChina['age' | 'name'];
type I2 = PersonChina[keyof PersonChina];
type AliveOrName = 'alive' | 'name';
type I3 = PersonChina[AliveOrName];

const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
];
type PersonAme = (typeof MyArray)[number];
type Age2 = (typeof MyArray)[number]['age'];
type Age3 = PersonAme['age'];
