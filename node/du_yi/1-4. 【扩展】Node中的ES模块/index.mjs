import dd, { a } from './a.mjs'
import("./a.mjs").then(r => console.log(r.default, r.a));
console.log(a, dd);
