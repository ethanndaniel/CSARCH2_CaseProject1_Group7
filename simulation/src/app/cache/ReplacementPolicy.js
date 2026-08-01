export const ReplacementPolicy = {
   LRU: "LRU",
   MRU: "MRU"
};

export function selectVictim(cacheSet, policy) {
   const emptyIndex = cacheSet.ways.findIndex(line => !line.valid);
   if (emptyIndex !== -1) {
       return emptyIndex;
   }

   let victimIndex = 0;

   for (let i = 1; i < cacheSet.ways.length; i++) {
       if (policy === ReplacementPolicy.LRU && cacheSet.ways[i].lastAccess < cacheSet.ways[victimIndex].lastAccess) {
           victimIndex = i;
       } else if (policy === ReplacementPolicy.MRU && cacheSet.ways[i].lastAccess > cacheSet.ways[victimIndex].lastAccess) {
           victimIndex = i;
       }
   }
   return victimIndex;
}