// Awaited
async function awaitedType(): Promise<string> {
  await Promise.resolve<string>('a');
  return 'b';
}
awaitedType().then((res) => {
  console.log(res);
});

type AwaitedTypes = Awaited<ReturnType<typeof awaitedType>>;

// Partial
interface Todo {
  title: string;
  desc: string;
  completed?: boolean;
  createdAt?: number;
}
function updateTodo(todo: Todo, filesUpdate: Partial<Todo>) {
  return {
    ...todo,
    ...filesUpdate,
  };
}
const todo: Todo = {
  title: 'a',
  desc: 'b',
};
console.log(updateTodo(todo, { desc: 'ccc' }));

// Required
interface Props {
  a?: number;
  b?: number;
}
const objfa: Props = { a: 5 };
const objfa2: Required<Props> = { a: 5 };

// ReadOnly Object.freeze
const todo2: Readonly<Todo> = {
  title: 'c',
  desc: 'c',
};
todo2.desc = 'b';

// Record
type CatName = 'miffy' | 'boris' | 'mordred';
interface CatInfo {
  age: number;
  breed: string;
}
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 1, breed: 'Persian' },
  boris: { age: 2, breed: 'Maine Coon' },
  mordred: { age: 15, breed: 'British Shorthair' },
};

// Pick key
type TodoPreview = Pick<Todo, 'title'>;
const todo3: TodoPreview = {
  title: '1',
  desc: '',
};

// Omit key
type TodoPreview2 = Omit<Todo, 'createdAt' | 'completed'>;
const todo4: TodoPreview2 = {
  title: '1',
  desc: '2',
};

// Exclude UnionType
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;
type T2 = Exclude<string | number | (() => void), Function>;
type Shapecec =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number };
type T3cc = Exclude<Shapecec, { kind: 'circle' }>;

// Extract
type T00 = Extract<'a' | 'b' | 'c', 'a' | 'cs'>;
type T01 = Extract<string | number | (() => void), Function>;
type T02 = Extract<Shapecec, { kind: 'circle' }>;

// NonNullable
type T11 = NonNullable<string | null | undefined>;

// Parameters
type Parameters2<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type s1 = Parameters<(a: string) => string>;
type s2 = Parameters<any>; // unknown[]
const aS1: s1 = ['a']; // tuple长度有限
const as2: string[] = ['a', 'b']; // Array长度没限制

// ConstructorParameters
type ConstructorParameters2<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

//        C is a constructor function
// typeof C is a constructor function type
class C {
  constructor(a: number, b: string) {}
}
type T20 = ConstructorParameters<ErrorConstructor>;
type s3 = typeof C;
type T3 = ConstructorParameters<typeof C>;
type T4 = ConstructorParameters2<typeof C>;

// ReturnType
declare function f11(): { a: number; b: string };
type T30 = ReturnType<() => string>;
type T31 = ReturnType<(s: string) => void>;
type T32 = ReturnType<<T>() => T>;
type T33 = ReturnType<<T extends U, U extends number[]>() => T>;
type T34 = ReturnType<typeof f11>;

// InstanceType
type T40 = InstanceType<typeof C>;
const c41 = new C(1, '');
const T42 = typeof c41;
// type T41 = InstanceType<typeof c41>

// function createStreetLight<C extends string>(colors: C[], defaultColor?: NoInfer<C>) {
//   // ...
// }
// createStreetLight(['red', 'yellow', 'green'], 'red'); // OK

// ThisParameterType TODO看下this
function toHex(this: number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

// OmitThisParameter
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
fiveToHex();
