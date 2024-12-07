import { loadInput, dayName, Difficulty } from "../utils/readUtils";
import { timedExecute } from "../utils/miscUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);
let lines = contents.split("\n");

function checkIfValid(target: number, nums: number[], useConcat = false): boolean {
    if (nums.length == 1) {
        return nums[0] == target;
    }
    
    if (target % nums[0] == 0) {
        if (checkIfValid(target / nums[0], nums.slice(1), useConcat)) return true;
    }
    if (checkIfValid(target - nums[0], nums.slice(1), useConcat)) return true;

    if (useConcat) {
        let concatTarget = `${target}`;
        if (concatTarget.endsWith(`${nums[0]}`)) {
            let newTarget = parseInt(concatTarget.slice(0, -`${nums[0]}`.length));
            return checkIfValid(newTarget, nums.slice(1), useConcat);
        }
    }
    return false;
}

console.log(`==== ${day}: PART 1 ====`);
timedExecute(() => {
    let checkLines = lines.map(line => {
        let parts = line.split(":");
        let target = parseInt(parts[0]);
        let nums = parts[1].trim().split(" ").map(n => parseInt(n)).reverse();
        return { target, nums, valid: checkIfValid(target, nums) };
    });
    let sum = checkLines.filter(cl => cl.valid).reduce((acc, cl) => acc + cl.target, 0);
    console.log(`Sum of targets that are valid: ${sum}`);
});

console.log(`==== ${day}: PART 2 ====`);
timedExecute(() => {
    let checkLines = lines.map(line => {
        let parts = line.split(":");
        let target = parseInt(parts[0]);
        let nums = parts[1].trim().split(" ").map(n => parseInt(n)).reverse();
        return { target, nums, valid: checkIfValid(target, nums, true) };
    });
    let sum = checkLines.filter(cl => cl.valid).reduce((acc, cl) => acc + cl.target, 0);
    console.log(`Sum of targets that are valid: ${sum}`);
});