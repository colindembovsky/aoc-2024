import { loadInput, dayName, Difficulty } from "../utils/readUtils";

let day = dayName(__dirname);
let contents = loadInput(__dirname, Difficulty.HARD);

let lines = contents.split("\n");

interface Position {
    x: number;
    y: number;
}

enum Direction {
    UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3
}

function parseGrid(lines: string[]): {
    grid: string[][],
    startPos: Position,
    startDir: Direction
} {
    const grid = lines.map(line => line.split(''));
    let startPos: Position = { x: 0, y: 0 };
    let startDir = Direction.UP;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if ('^>v<'.includes(grid[y][x])) {
                startPos = { x, y };
                startDir = '^>v<'.indexOf(grid[y][x]);
                grid[y][x] = '.'; // Replace guard with empty space
            }
        }
    }

    return { grid, startPos, startDir };
}

interface VisitResult {
    isLoop: boolean;
    numVisitedSpaces: number;
}

function calculateVisitedSpaces(grid: string[][], startPos: Position, startDir: Direction): VisitResult {
    const visited = new Set<string>();
    const states = new Set<string>();
    const directions = [
        { dx: 0, dy: -1 }, // UP
        { dx: 1, dy: 0 },  // RIGHT
        { dx: 0, dy: 1 },  // DOWN
        { dx: -1, dy: 0 }  // LEFT
    ];

    let currentPos = { ...startPos };
    let currentDir = startDir;
    
    while (true) {
        const stateKey = `${currentPos.x},${currentPos.y},${currentDir}`;
        
        if (states.has(stateKey)) {
            return { isLoop: true, numVisitedSpaces: visited.size };
        }
        
        states.add(stateKey);
        visited.add(`${currentPos.x},${currentPos.y}`);

        const dir = directions[currentDir];
        const nextPos = {
            x: currentPos.x + dir.dx,
            y: currentPos.y + dir.dy
        };

        // Check if we're out of bounds
        if (nextPos.y < 0 || nextPos.y >= grid.length ||
            nextPos.x < 0 || nextPos.x >= grid[0].length) {
            return { isLoop: false, numVisitedSpaces: visited.size };
        }

        // Check if we hit an obstacle
        if (grid[nextPos.y][nextPos.x] === '#') {
            currentDir = (currentDir + 1) % 4; // Turn right
            continue;
        }

        currentPos = nextPos;
    }
}

function findLoopingPositions(grid: string[][], startPos: Position, startDir: Direction): number {
    let loopCount = 0;
    
    // Try each empty space
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === '.') {
                // Skip start position
                if (x === startPos.x && y === startPos.y) {
                    continue;
                }
                
                // Create grid copy and add obstacle
                const testGrid = grid.map(row => [...row]);
                testGrid[y][x] = '#';
                
                // Test if guard gets stuck
                const result = calculateVisitedSpaces(testGrid, startPos, startDir);
                if (result.isLoop) {
                    loopCount++;
                }
            }
        }
    }
    
    return loopCount;
}

const { grid, startPos, startDir } = parseGrid(lines);

console.log(`==== ${day}: PART 1 ====`);
const count = calculateVisitedSpaces(grid, startPos, startDir).numVisitedSpaces;
console.log(`Result: ${count}`);

console.log(`==== ${day}: PART 2 ====`);
const loopCount = findLoopingPositions(grid, startPos, startDir);
console.log(`Result: ${loopCount}`);