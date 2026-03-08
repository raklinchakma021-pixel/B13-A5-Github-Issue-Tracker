1️⃣ What is the difference between var, let, and const?

 var is function scope but let and const are block scope.

 var is supports redeclare but let and const not.

 var and let is reassignable but const is not reassinable.

2️⃣ What is the spread operator (...)?

The spread operator expands elements from an array or object.
For example..


```javascript
const nums = [1,2,3];
const newNums = [...nums, 4,5]; //spread operator

console.log(newNums);
// [1,2,3,4,5]
```
it is Very useful in React and modern JS.


3️⃣ What is the difference between map(), filter(), and forEach()?

map() transform an array and return new array.It changes every time.

filter() selects elements and return new.It selects specific items.

and forEach return nothing but loop through an array

4️⃣ What is an arrow function?

Arrow functions are shorter syntax for functions.
normal function:
```javascript
function add(a,b){
  return a + b;
}

arrow function
const add = (a,b) => {
  return a + b;
};
```
very commonly used with map(), filter(), reduce().

5️⃣ What are template literals?

Template literals allow string interpolation and multi-line strings.They use backticks `.Example:
```javascript
const name = "Raklin";
const age = 22;

const text = `My name is ${name} and I am ${age} years old`;

console.log(text); // My name is Raklin and I am 22 years old
```

multiline string
```javascript
const message = `
Hello
Welcome
To JavaScript
`;
```