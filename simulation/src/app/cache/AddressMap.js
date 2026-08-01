export function mapBlock(memoryBlock, numberOfSets) {

    //get index and tag from a memory block
    const index = memoryBlock % numberOfSets; //set index pattern: 0,1,2,3
    const tag = Math.floor(memoryBlock / numberOfSets);

    return {memoryBlock,index,tag};

}