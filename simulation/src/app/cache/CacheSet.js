import { createCacheLine } from "./CacheLine.js";


export function createCacheSet() {
    
    //return cache set object with 4 cache lines (4 way bsa)
    return {
        ways: [createCacheLine(), createCacheLine(), createCacheLine(), createCacheLine()]
    };
}