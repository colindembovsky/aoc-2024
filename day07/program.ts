import { loadInput, dayName, Difficulty } from "../utils/readUtils";
import { timedExecute } from "../utils/miscUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);
let lines = contents.split("\n");

function checkIfValid(target: number, nums: number[]): boolean {
    if (nums.length == 1) {
        return nums[0] == target;
    }
    
    if (target % nums[0] == 0) {
        if (checkIfValid(target / nums[0], nums.slice(1))) return true;
    }
    return checkIfValid(target - nums[0], nums.slice(1));
}

console.log(`==== ${day}: PART 1 ====`);

timedExecute(() => {
    let checkLines = lines.map(line => {
        let parts = line.split(":");
        let target = parseInt(parts[0]);
        let nums = parts[1].trim().split(" ").map(n => parseInt(n)).reverse();
        return { target, nums, valid: checkIfValid(target, nums) };
    });
    // add the target of the lines where the checkWorks is true
    let sum = checkLines.filter(cl => cl.valid).reduce((acc, cl) => acc + cl.target, 0);
    console.log(`Sum of targets that are valid: ${sum}`);
});