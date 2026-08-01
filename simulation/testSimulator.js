import { createCache } from "./src/app/cache/Cache.js";
import { ReadPolicy } from "./src/app/cache/ReadPolicy.js";
import { mapBlock } from "./src/app/cache/AddressMap.js";
import { createSimulator } from "./src/app/cache/CacheSimulator.js";
import { ReplacementPolicy } from "./src/app/cache/ReplacementPolicy.js";


const cache = createCache({
    blockSize: 4,
    totalCacheBlocks: 16,
    readPolicy: ReadPolicy.LOAD_THROUGH
});

//test mapping of mem blocks
console.log(mapBlock(0, cache.numberOfSets));
console.log(mapBlock(32, cache.numberOfSets));
console.log(mapBlock(67, cache.numberOfSets));

//test for cache sim
const sim = createSimulator(cache, ReplacementPolicy.MRU);//change to LRU or MRU to test different replacement policies

//Test case a: sequential, n=16, so access 0..31, twice
const n = cache.totalCacheBlocks;
const sequence = [];
for (let rep = 0; rep < 2; rep++) {
    for (let b = 0; b < 2 * n; b++) {
        sequence.push(b);
    }
}

sequence.forEach(block => sim.accessMemoryBlock(block));
console.log(sim.getStats());
//type in cmd: npm run test-cache