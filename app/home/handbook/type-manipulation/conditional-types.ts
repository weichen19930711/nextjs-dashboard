// Conditional Types
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;
/**
 *  But the power of conditional types comes from using them with generics.
 */

// Conditional Type Constraints
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw 'unimplemented';
}
let act = createLabel('typescript');
let bct = createLabel(11);
let cct = createLabel(Math.random() ? 'hello' : 42);

type MessageOf<T extends { message: unknown }> = T['message'];
interface Email {
  message: string;
}
type EmailMessageContents = MessageOf<Email>;
const emc: EmailMessageContents = 'a';

type MessageOfNoConstrain<T> = T extends { message: unknown } ? T['message'] : never;
interface Dog {
  bark(): void;
}
type DogMessage = MessageOfNoConstrain<Dog>;

type Flatten<T> = T extends any[] ? T[number] : T;
type Str = Flatten<string[]>;
type Num = Flatten<number>;

// inferring Within Conditional Types
type GetReturnType<Type> = Type extends (...args: never[]) => infer c ? c : never;
type NumInfer = GetReturnType<() => number>;
type StrInfer = GetReturnType<(x: string) => string>;
type BoolsInfer = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

// Distributive Conditional Types
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type ArrOfStrOrNum = ToArrayNonDist<string | number>;
