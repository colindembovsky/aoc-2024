import { loadInput, dayName, Difficulty } from "../utils/readUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);

class Level {
    public firstUnsafeLevel: number;
    public safe = true;
    public safeWith1LevelRemoved = true;
    public nums: number[];
    
    constructor(public line: string) {
        this.nums = line.split(" ").map(n => parseInt(n));
        this.firstUnsafeLevel = this.unsafeLevel(this.nums);
        this.safe = this.firstUnsafeLevel === -1;
        this.safeWith1LevelRemoved = this.isSafeWith1LevelRemoved();
        if (!this.safe) {
            //console.log(`${line}: ${this.firstUnsafeLevel} [${this.safeWith1LevelRemoved}]`);
        }
    }

    unsafeLevel(digits: number[]): number {
        let initialDiff = digits[1] - digits[0];
        if (Math.abs(initialDiff) < 1 || Math.abs(initialDiff) > 3) return 0;

        let diffPositive = initialDiff > 0;
        for (let i = 1; i < digits.length - 1; i++) {
            let diff = digits[i + 1] - digits[i];
            if ((diff > 0) !== diffPositive || Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                return i;
            }
        }
        return -1;
    }

    isSafeRemovingLevel(unsafeLevel: number): boolean {
        let newNums = this.nums.slice(0, unsafeLevel).concat(this.nums.slice(unsafeLevel + 1));

        let isNowSafe = this.unsafeLevel(newNums) === -1;
        if (unsafeLevel === 0) {
            newNums = this.nums.slice(0, 1).concat(this.nums.slice(2));
            return isNowSafe || this.unsafeLevel(newNums) === -1;
        }
        return isNowSafe;
    }

    isSafeWith1LevelRemoved(): boolean {
        if (this.safe) return true;
        return this.isSafeRemovingLevel(this.firstUnsafeLevel) || this.isSafeRemovingLevel(this.firstUnsafeLevel + 1) ||
            this.isSafeRemovingLevel(this.firstUnsafeLevel - 1);
    }
}

console.log(`==== ${day}: PART 1 ====`);
let lines = contents.split("\n");
let levels = lines.map(l => new Level(l));
let safeLevels = levels.filter(l => l.safe);
console.log(safeLevels.length);

console.log(`==== ${day}: PART 2 ====`);
let safeWith1LevelRemoved = levels.filter(l => l.safeWith1LevelRemoved);
console.log(safeWith1LevelRemoved.length);