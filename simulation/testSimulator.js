import { createCache } from "./src/app/cache/Cache.js";
import { ReadPolicy } from "./src/app/cache/ReadPolicy.js";
import { mapBlock } from "./src/app/cache/AddressMap.js";
import { createSimulator } from "./src/app/cache/CacheSimulator.js";
import { ReplacementPolicy } from "./src/app/cache/ReplacementPolicy.js";

import { sequentialSequence, midRepeatBlocks, randomSequence } from "./src/app/cache/TestCases.js";



const cache = createCache({
    blockSize: 4,
    totalCacheBlocks: 4, //changed to 4 for Test Cases
    readPolicy: ReadPolicy.LOAD_THROUGH
});

//test mapping of mem blocks
console.log(mapBlock(0, cache.numberOfSets));
console.log(mapBlock(32, cache.numberOfSets));
console.log(mapBlock(67, cache.numberOfSets));


//test for cache sim
const sim = createSimulator(cache, ReplacementPolicy.MRU);//change to LRU or MRU to test different replacement policies


//choose a test case A, B, or C:
// const sequence = sequentialSequence(cache.totalCacheBlocks);
// const sequence = midRepeatBlocks(cache.totalCacheBlocks);
const sequence = randomSequence();


console.log(sequence);
console.log("Length:", sequence.length);

//run the simulation
for (const block of sequence) {
    sim.accessMemoryBlock(block);
}

//display results
const log = sim.getLog();
log.forEach(entry => {
    console.log(entry);
});
console.log(sim.getStats());
console.log(cache);

//type in cmd: npm run test-cache