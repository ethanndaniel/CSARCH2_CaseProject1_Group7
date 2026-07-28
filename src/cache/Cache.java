public class Cache {

    //based on common specs
    private int blockSize;
    private int totalCacheBlocks;
    private int numberOfSets;

    private CacheSet[] sets;
    private ReadPolicy readPolicy;

}