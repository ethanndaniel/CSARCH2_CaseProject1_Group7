export interface CacheContent {
    accessCount?: number;
    hitCount?: number;
    missCount?: number;
    hitRate?: number;
    missRate?: number;
    AMAT?: number;
    TMAT?: number; 
}

export default function Summary({ content }: { content: CacheContent }) {
    return (
        <div className="w-full h-full bg-white text-black flex flex-col p-5">
        <div className="w-full flex justify-center items-center">
            <h1>Summary</h1>
        </div>   
            <span className="text-black">
                Access Count: {content?.accessCount ?? 0}<br/>
                Hit Count: {content?.hitCount ?? 0}<br/>
                Miss Count: {content?.missCount ?? 0}<br/>
                Hit Rate: {content?.hitRate !== undefined ? `${(content.hitRate * 100).toFixed(2)}%` : "0%"}<br/>
                Miss Rate: {content?.missRate !== undefined ? `${(content.missRate * 100).toFixed(2)}%` : "0%"}<br/>
                AMAT: {content?.AMAT !== undefined ? `${content.AMAT.toFixed(2)} ns/cycles` : "0"}<br/>
                TMAT: {content?.TMAT !== undefined ? `${content.TMAT.toFixed(2)} ns/cycles` : "0"}<br/>
            </span>
        </div>
    );
}