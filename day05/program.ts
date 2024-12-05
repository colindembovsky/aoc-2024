import { loadInput, dayName, Difficulty } from "../utils/readUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);

class Rule {
    beforePages: number[] = [];
    afterPages: number[] = [];

    constructor(public id: number) {
        rawRules.filter(r => r[0] === id).forEach(r => this.beforePages.push(r[1]));
        rawRules.filter(r => r[1] === id).forEach(r => this.afterPages.push(r[0]));
    }
}

class Update {
    get middleNumber(): number {
        return this.pageNums[Math.floor(this.pageNums.length / 2)];
    }
    isCorrectlyOrdered = true;

    constructor(public pageNums: number[]) {
        this.checkOrder();
    }

    checkOrder() {
        for (let i = 0; i < this.pageNums.length; i++) {
            let thisPage = this.pageNums[i];
            let leftPages = this.pageNums.slice(0, i);
            let rightPages = this.pageNums.slice(i + 1);

            let rule = rules.get(thisPage);
            if (rule) {
                // if any of the left pages is after this page, it's not ordered
                // if any of the right pages is before this page, it's not ordered
                if (leftPages.some(p => rule.beforePages.includes(p)) || 
                    rightPages.some(p => rule.afterPages.includes(p))) {
                    this.isCorrectlyOrdered = false;
                    break;
                }
            }
        }
        this.isCorrectlyOrdered
    }

    fixOrder() {
        const result: number[] = [];
        
        for (const num of this.pageNums) {
            let insertPos = result.length; // default to end
            const rule = rules.get(num);
            
            if (rule) {
                // Check if any numbers in result are in beforePages or afterPages
                for (let i = 0; i < result.length; i++) {
                    const existingNum = result[i];
                    
                    if (rule.beforePages.includes(existingNum)) {
                        // num should come before existingNum
                        insertPos = Math.min(insertPos, i);
                    }
                    if (rule.afterPages.includes(existingNum)) {
                        // num should come after existingNum
                        insertPos = Math.max(insertPos, i + 1);
                    }
                }
            }
            
            result.splice(insertPos, 0, num);
        }
        
        this.pageNums = result;
    }
}

let parts = contents.split("\n\n");
let rawRules = parts[0].split("\n").map(r => r.split("|").map(n => parseInt(n)));
let rules = new Map<number, Rule>();
rawRules.forEach(r => rules.set(r[0], new Rule(r[0])));

let rawUpdates = parts[1].split("\n").map(u => u.split(",").map(n => parseInt(n)));
let updates = rawUpdates.map(u => new Update(u));


console.log(`==== ${day}: PART 1 ====`);
let sum = updates.filter(u => u.isCorrectlyOrdered).reduce((acc, u) => acc + u.middleNumber, 0);
console.log(`Sum: ${sum}`);

console.log(`==== ${day}: PART 2 ====`);
let broken = updates.filter(u => !u.isCorrectlyOrdered);
broken.forEach(b => b.fixOrder());
sum = broken.reduce((acc, u) => acc + u.middleNumber, 0);
console.log(`Sum: ${sum}`);
