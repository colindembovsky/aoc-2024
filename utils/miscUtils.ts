export function timedExecute(fn: () => void) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`Time taken: ${(end - start).toFixed(2)} ms`);
}