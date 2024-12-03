import { loadInput, dayName, Difficulty } from "../utils/readUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);

console.log(`==== ${day}: PART 1 ====`);
let regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

let matches = [];
let match;
let sum = 0;

while ((match = regex.exec(contents)) !== null) {
  const a = parseInt(match[1], 10);
  const b = parseInt(match[2], 10);
  matches.push(match[0]);
  sum += a * b;
}

console.log(`Sum of products: ${sum}`);

console.log(`==== ${day}: PART 2 ====`);
//let test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;

matches = [];
sum = 0;
let enabled = true;

while ((match = regex.exec(contents)) !== null) {
  switch (match[0]) {
    case "do()":
      enabled = true;
      break;
    case "don't()":
      enabled = false;
      break;
    default:
      if (enabled) {
        const a = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);
        matches.push(match[0]);
        sum += a * b;
      }
      break;
  }
}

console.log(`Sum of products: ${sum}`);