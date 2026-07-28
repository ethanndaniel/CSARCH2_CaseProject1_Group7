public class CacheLine {

    //parameters of a cache line
    private boolean valid;
    private int tag;
    private int memoryBlock;
    private long lastAccessTime;


    public CacheLine() {
        valid = false;
        tag = 0;
        memoryBlock = 0;
        lastAccessTime = 0;
    }

}