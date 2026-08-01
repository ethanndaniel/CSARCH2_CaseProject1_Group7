import { createCache } from "./src/app/cache/Cache.js";
import { ReadPolicy } from "./src/app/cache/ReadPolicy.js";

const cache = createCache({
    blockSize: 4,
    totalCacheBlocks: 16,
    readPolicy: ReadPolicy.LOAD_THROUGH
});

console.log(cache);