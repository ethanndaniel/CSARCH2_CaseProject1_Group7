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
        <div className="w-full h-auto  bg-[#43598B] text-black flex flex-col p-5">
        <div className="w-full text-white flex justify-center items-center font-gloock text-xl">
            <h1>Summary</h1>
        </div>   
            <div className="text-white font-moderustic text-body w-full text-center mt-2">
                <label className="font-semibold mr-5">Access Count:</label> {content?.accessCount ?? 0}<br/>
                <label className="font-semibold mr-5">Hit Count: </label>{content?.hitCount ?? 0}<br/>
                <label className="font-semibold mr-5">Miss Count: </label>{content?.missCount ?? 0}<br/>
                <label className="font-semibold mr-5">Hit Rate: </label>{content?.hitRate !== undefined ? `${(content.hitRate * 100).toFixed(2)}%` : "0%"}<br/>
                <label className="font-semibold mr-5">Miss Rate: </label>{content?.missRate !== undefined ? `${(content.missRate * 100).toFixed(2)}%` : "0%"}<br/>
                <label className="font-semibold mr-5">AMAT: </label>{content?.AMAT !== undefined ? `${content.AMAT.toFixed(2)} ns` : "0"}<br/>
                <label className="font-semibold mr-5">TMAT: </label>{content?.TMAT !== undefined ? `${content.TMAT.toFixed(2)} ns` : "0"}<br/>
            </div>
        <h1 className="font-gloock text-xs mt-5 text-center text-white">Made by : Group7_S02</h1>
        </div>
    );
}