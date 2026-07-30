public class CacheSet {

    //4 ways per set
    private CacheLine[] ways = new CacheLine[4];

    public CacheSet() {
        for (int i = 0; i < 4; i++) {
            ways[i] = new CacheLine();
        }
    }
    

}