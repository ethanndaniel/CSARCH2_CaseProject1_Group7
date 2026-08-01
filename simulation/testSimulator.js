import { createCache } from "./src/app/cache/Cache.js";
import { ReadPolicy } from "./src/app/cache/ReadPolicy.js";
import { mapBlock } from "./src/app/cache/AddressMap.js";


const cache = createCache({
    blockSize: 4,
    totalCacheBlocks: 16,
    readPolicy: ReadPolicy.LOAD_THROUGH
});

//test mapping of mem blocks
console.log(mapBlock(0, cache.numberOfSets));
console.log(mapBlock(32, cache.numberOfSets));
console.log(mapBlock(67, cache.numberOfSets));
//type in cmd: npm run test-cache