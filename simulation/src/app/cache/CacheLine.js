export function createCacheLine() {
    
    //return a cache line object
    return {
        valid: false,
        tag: null,
        memoryBlock: null,
        lastAccess: 0
    };
}