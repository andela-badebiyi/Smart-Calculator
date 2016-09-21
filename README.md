# Smart-Calculator
A smart JS calculator that takes an arithmetic equation in string, parses it and performs the calculation in the right order of operation.

It can also receive a second argument that stores variables that can be substituted into your equation

## Usage
```js
  var equation1 = '2 + 2 - 1';
  console.log(smartCalculator(equation1)); //logs 3 to the console

  var equation2 = '2 * 2 / 4 * 6';
  console.log(smartCalculator(equation2)); //logs 6 to the console

  var equation3 = '(1 + 1) * (3 * 5 / 2) + 3 / 3 + ((23 - 10.5) * 2)';
  console.log(smartCalculator(equation3)); //logs 41 to the console

  var equation4 = '3 + 2 + pi + a';
  console.log(smartCalculator(equation4, ['pi = 23', 'a = 21']); //logs 49 to the console
```
