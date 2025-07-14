// Template Literal Types

type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = 'en' | 'ja' | 'pt';
// type Locale
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

// String Unions in Types
type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

/// Create a "watched object" with an `on` method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
const objtlt = {
  firstName: 'Saoirse',
  lastName: 'Ronan',
  age: 26,
};
const person1 = makeWatchedObject(objtlt);
person1.on('firstNameChanged', () => {});
person1.on('firstName', () => {});

// Inference with Template Literals
/**
 * naively 简单地
 * The key insight 关键的见解
 * figures that out 确认了that
 */
type PropEventCallbackConsSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void,
  ): void;
};
declare function makeWatchedObjectCallbackCons<Type>(
  obj: Type,
): Type & PropEventCallbackConsSource<Type>;

const person2 = makeWatchedObjectCallbackCons(objtlt);
person2.on('firstNameChanged', (newFName) => {
  console.log(`new name is ${newFName.toUpperCase()}`);
});
person2.on('ageChanged', (newAge) => {
  if (newAge < 0) {
    console.warn('warning! negative age');
  }
});

// Intrinsic String Manipulation Types
/**
 * These types come built-in to the compiler for performance and
 * can’t be found in the .d.ts files included with TypeScript.
 */
type Greeting = 'Hello, world';
type ShoutyGreeting = Uppercase<Greeting>;
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<'my_app'>;
