let s = 'hello';
let zz: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
  return { x: 10, y: 3 };
}
type nn = ReturnType<typeof f>;

declare function msgbox(propmt: string): boolean;
// Meant to use = ReturnType<typeof msgbox>
// let shouldContinue1: ReturnType<typeof msgbox>;
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
