import { loadInput, dayName, Difficulty } from "../utils/readUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.EASY);

console.log(contents);

console.log(`==== ${day}: PART 1 ====`);
let lines = contents.split("\n");