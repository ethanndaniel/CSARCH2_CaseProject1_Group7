export interface CacheContent{
    accessCount?:number,
    hitCount?:number,
    missCount?:number,
    hitRate?:number,
    missRate?:number,
    AMAT?:number,
    THAT?:number
}

export default function Summary({content}:{content:CacheContent}){
    return(
        <div className="w-full h-full bg-white text-black flex flex-col p-5">
            <div className="w-full flex justify-center items-center">
                <h1>Summary</h1>
            </div>   
                <span className="text-black">
                    Access Count:{content.accessCount}<br/>
                    Hit Count:{content.hitCount}<br/>
                    Miss Count:{content.missCount}<br/>
                    Hit Rate:{content.hitRate}<br/>
                    Miss Rate:{content.missRate}<br/>
                    AMAT:{content.AMAT}<br/>
                    THAT:{content.THAT}<br/>
                </span>
        </div>
    );
}