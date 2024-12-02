import { loadInput, dayName, Difficulty } from "../utils/readUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);

//console.log(contents);

console.log(`==== ${day}: PART 1 ====`);
let lines = contents.split("\n");
let left: number[] = [];
let right: number[] = [];

lines.forEach((line) => {
    let [l, r] = line.split("   ");
    left.push(parseInt(l));
    right.push(parseInt(r));
});

// sort both arrays from smallest to largest
left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

// loop through the lists adding the absolute diff between each index
let sum = 0;
for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
}
console.log(`Diff sum: ${sum}`);

console.log(`==== ${day}: PART 2 ====`);

let cache: { [key: number]: number } = {};
function findNumberCount(arr: number[], num: number) {
    // if the cache has the number, return it
    if (cache[num]) {
        return cache[num];
    }

    let count = arr.filter((n) => n === num).length;
    cache[num] = count;
    return count;
}

// loop through the left array, keeping a sum of the number * the number of times it appears in the right array
let sum2 = 0;
for (let i = 0; i < left.length; i++) {
    sum2 += left[i] * findNumberCount(right, left[i]);
}
console.log(`Sum of left * count in right: ${sum2}`);