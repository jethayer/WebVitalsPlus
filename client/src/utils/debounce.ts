export function debounce(func: (...args: unknown[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: unknown[]) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func(...args), wait);
    };
}
