export function timedExecute(fn: () => void) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const timeTaken = end - start;
    
    if (timeTaken > 1000) {
        console.log(`Time taken: ${(timeTaken / 1000).toFixed(2)}s`);
    } else {
        console.log(`Time taken: ${timeTaken.toFixed(2)}ms`);
    }
    console.log();
}