import { loadInput, dayName, Difficulty } from "../utils/readUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);

console.log(`==== ${day}: PART 1 ====`);
let letters = contents.split("\n").map(l => l.split(""));

function findWordCountAtPos(word = "XMAS", x: number, y: number): number {
    if (letters[y][x] !== word[0]) return 0;
    
    // Helper to check word in a specific direction
    function checkDirection(dx: number, dy: number, pos: number = 1): boolean {
        if (pos === word.length) return true;
        
        const newX = x + (dx * pos);
        const newY = y + (dy * pos);
        
        // Check bounds
        if (newX < 0 || newX >= letters[0].length || 
            newY < 0 || newY >= letters.length) {
            return false;
        }
        
        // Check if current letter matches
        if (letters[newY][newX] !== word[pos]) {
            return false;
        }
        
        return checkDirection(dx, dy, pos + 1);
    }
    
    // Check all 8 directions
    let count = 0;
    const directions = [
        [-1,-1], [0,-1], [1,-1],   // Up-left, Up, Up-right
        [-1,0],          [1,0],    // Left, Right
        [-1,1],  [0,1],  [1,1]     // Down-left, Down, Down-right
    ];
    
    for (const [dx, dy] of directions) {
        if (checkDirection(dx, dy)) count++;
    }
    
    return count;
}

type Position = `${number},${number}`;

function createWordCountMap(word: string = "XMAS"): Map<Position, number> {
    const countMap = new Map<Position, number>();
    for (let y = 0; y < letters.length; y++) {
        for (let x = 0; x < letters[y].length; x++) {
            const count = findWordCountAtPos(word, x, y);
            if (count > 0) {
                const pos: Position = `${x},${y}`;
                countMap.set(pos, count);
            }
        }
    }
    
    return countMap;
}

const wordCounts = createWordCountMap();
let total = [...wordCounts.values()].reduce((a, b) => a + b, 0);
console.log(`Total count: ${total}`);

console.log(`==== ${day}: PART 2 ====`);

function countXShapedMAS(): number {
    const height = letters.length;
    const width = letters[0].length;
    let count = 0;

    // Helper to check if position is within grid bounds
    const isValid = (row: number, col: number): boolean => {
        return row >= 0 && row < height && col >= 0 && col < width;
    };

    // Check each position in grid
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            // Check if current position is 'A'
            if (letters[row][col] === 'A') {
                // Check upper-left to lower-right diagonal
                const hasMS1 = isValid(row - 1, col - 1) && 
                             isValid(row + 1, col + 1) &&
                             ((letters[row - 1][col - 1] === 'M' && letters[row + 1][col + 1] === 'S') ||
                              (letters[row - 1][col - 1] === 'S' && letters[row + 1][col + 1] === 'M'));

                // Check upper-right to lower-left diagonal
                const hasMS2 = isValid(row - 1, col + 1) && 
                             isValid(row + 1, col - 1) &&
                             ((letters[row - 1][col + 1] === 'M' && letters[row + 1][col - 1] === 'S') ||
                              (letters[row - 1][col + 1] === 'S' && letters[row + 1][col - 1] === 'M'));

                // If both diagonals have valid MS/SM patterns
                if (hasMS1 && hasMS2) {
                    count++;
                }
            }
        }
    }

    return count;
}

total = countXShapedMAS();
console.log(`Total X-MAS count: ${total}`); 