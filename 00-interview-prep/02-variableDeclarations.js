//var, let, key are variable declaration keywords

// 1. Scope - Var is function scoped and not block scoped
// It respects only function scope & global scope
var name = "shashi";
if (true) {
  console.log(name);
}
const executeConsoleLog = () => {
  var name = "shiv";
  console.log(name);
};
executeConsoleLog();

// 2. Scope - let & const
// let & const are block scoped
// if (true) {
//   let a = 1;
//   const b = 2;
// }
// console.log(a);
// console.log(b);

// 3. Shadowing  - inner variable hides outer variable

//✅ let shadows var
var x = 10;

if (true) {
  let x = 20;
  console.log(x);
}

console.log(x);

// ❌ Illegal Shadowing
// let y = 10;
// if (true) {
//   var y = 20;
//   console.log(y);
// }
// console.log(y);

// let can shadow let

//4. Declareing vs Initialization
// you can declare var & let without initializing it, but not with const
// Declaration = creating variable name
// Initialization = assigning value
var p;
p = 10; // allowed

let q;
q = 10; //allowed

// const r; //not allowed

// 5. Redeclaring
// var can redeclare
// let & const cannot redeclare
var a = 10;
var a = 20; // ✅ allowed

// let b = 10;
// let b = 20; // ❌ Error

// const c = 10;
// const c = 20; // ❌ Error

// 6. Hoisting
//🔵 var → Hoisted with undefined
console.log(a); // undefined
var a = 10;

// JS internally does:
var a;
console.log(a);
a = 10;
// 🟢 let & const → Hoisted but in TDZ
console.log(b); // ❌ ReferenceError
let b = 20;
