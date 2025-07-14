function toArray<X>(xs: Iterable<X>) {
  return [...xs];
}

const arrs = [11, 22];
const brrs = toArray(arrs);
console.log(brrs);

let crrs = [1, 'string', false];
for (let entry of crrs) {
  console.log(entry);
}
