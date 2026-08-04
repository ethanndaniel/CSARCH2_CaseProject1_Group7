import { createCacheSet } from "./CacheSet.js";
import { selectVictim } from "./ReplacementPolicy.js";
export function createCache(config) {

    validateSpecs(config);

    //common specs
    const ways = 4;
    const numberOfSets = config.totalCacheBlocks / ways;

    return {
        blockSize: config.blockSize,
        totalCacheBlocks: config.totalCacheBlocks,
        mainMemoryBlocks: 1024,
        ways,
        numberOfSets,
        readPolicy: config.readPolicy,
        sets: Array.from(
            { length: numberOfSets },
            () => createCacheSet(ways)
        ),
        replacementPolicy:selectVictim(numberOfSets,config.readPolicy)
    };

    //validate common specs
    function validateSpecs(config) {
        if (config.blockSize < 2)
            throw new Error("Minimum of 2 words.");

        if (config.totalCacheBlocks < 4)
            throw new Error("Minimum of 4 blocks.");

        if (!isPowerOfTwo(config.blockSize))
            throw new Error("Must be a power of 2.");

        if (!isPowerOfTwo(config.totalCacheBlocks))
            throw new Error("Must be a power of 2.");

        if (config.totalCacheBlocks % 4 !== 0)
            throw new Error("Must be divisible by 4 for 4-way bsa.");
    }

    //helper to verify power of two values (src: geeksforgeeks.org)
    function isPowerOfTwo(n) {
        if (n <= 0)
        return false;

        while (n > 1) {
            if (n % 2 !== 0)
                return false;

        n = Math.floor(n / 2);
        }
    return true;
    }
}