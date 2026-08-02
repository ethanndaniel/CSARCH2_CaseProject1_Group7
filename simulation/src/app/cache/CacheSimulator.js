import {
    mapBlock
}
from './AddressMap.js';

import {
    selectVictim
}
from './ReplacementPolicy.js';

import {
    ReadPolicy
}
from './ReadPolicy.js';

//values derived from sir rog's cache memory lessons
export const Timing = {
    cacheAccessTime: 1, //1 tau second for cache access
    memoryAccessTimePerWord: 10 //10 tau seconds for main memory access per word
};

export function createSimulator(cache, replacementPolicy) {

    let accessCount = 0;
    let hitCount = 0;
    let missCount = 0;
    let log = [];

    function accessMemoryBlock(memoryBlock) {
        accessCount++;

        const { index, tag } = mapBlock(memoryBlock, cache.numberOfSets);
        const cacheSet = cache.sets[index];

        const hitway = cacheSet.ways.findIndex(line => line.valid && line.tag === tag);

        if (hitway !== -1) {
            hitCount++;
            cacheSet.ways[hitway].lastAccess = accessCount;

            log.push(traceLogs(hitway, true, null));

            return true; //hit
        }
        else {
            missCount++;
            const victimWay = selectVictim(cacheSet, replacementPolicy);

            const evictedBlock = cacheSet.ways[victimWay].valid ? cacheSet.ways[victimWay].memoryBlock : null;

            cacheSet.ways[victimWay].valid = true;
            cacheSet.ways[victimWay].tag = tag;
            cacheSet.ways[victimWay].lastAccess = accessCount;

            cacheSet.ways[victimWay].memoryBlock = memoryBlock;

            log.push(traceLogs(victimWay, false, evictedBlock));

            return false; //miss
        }

        function traceLogs(way, isHit, evictedBlock) {
            return {
                accessNumber: accessCount,
                memoryBlock: memoryBlock,
                setIndex: index,
                tag: tag,
                way: way,
                hit: isHit,
                evictedBlock: evictedBlock
            };
        }
        
    }


    function getStats() {
        if (accessCount === 0) {
            return {
                accessCount: 0,
                hitCount: 0,
                missCount: 0,
                hitRate: 0,
                missRate: 0,
                AMAT: 0,
                TMAT: 0
            };
        }
        else {
            const hitRate = hitCount / accessCount;
            return {
                accessCount: accessCount,
                hitCount: hitCount,
                missCount: missCount,
                hitRate: hitRate,
                missRate: missCount / accessCount,
                AMAT: calculateAMAT(hitRate, Timing.cacheAccessTime, Timing.memoryAccessTimePerWord),
                TMAT: calculateTMAT(hitRate, Timing.cacheAccessTime, Timing.memoryAccessTimePerWord)
            };
        }
    }
    
    //formula derived from sir rog's cache memory lessons
    function calculateAMAT(hitRate, cacheAccessTime, memoryAccessTimePerWord) {
        let M;
        
        if (cache.readPolicy == ReadPolicy.LOAD_THROUGH) {
            M = 1 + memoryAccessTimePerWord;
        }
        else {
            M = 1 + (memoryAccessTimePerWord * cache.blockSize) + 1;
        }
            
        const AMAT = (hitRate * cacheAccessTime) + ((1 - hitRate) * M);
        return AMAT;
    }
    
    
    function calculateTMAT(hitRate, cacheAccessTime, memoryAccessTimePerWord) {            
        const TMAT = calculateAMAT(hitRate, cacheAccessTime, memoryAccessTimePerWord) * accessCount; 
        return TMAT;
    }

    return {
        accessMemoryBlock,
        getStats,
        getLog: () => log
    };
}
