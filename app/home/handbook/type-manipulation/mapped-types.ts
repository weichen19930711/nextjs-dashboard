// mapped types
type Horse = string;
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
  str: 'sss',
};
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type Features = {
  0: 'cc';
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<Features>;

// Mapping Modifiers
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
type UserMapped = Concrete<MaybeUser>;

// Key Remapping via "as"
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};
interface PersonMT {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<PersonMT>;

type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property];
};
interface Circle {
  kind: 'circle';
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>; // Remove the 'kind' property

// 遍历联合类型
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E['kind']]: (event: E) => void;
};
type SquareEvent = { kind: 'square'; x: number; y: number };
type CircleEvent = { kind: 'circle'; radius: number };
type unions = SquareEvent | CircleEvent;
type ccccc = unions extends { kind: string } ? number : string;
type Config = EventConfig<unions>;

// Further Exploration
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
type DBFields = {
  id: { format: 'incrementing' };
  name: { type: string; pii: true };
};
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
