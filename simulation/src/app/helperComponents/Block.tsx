export default function Block({blockNum, numWord}:{blockNum:number, numWord:number}){
    return(
        <div className="w-[15vw] h-fit overflow-auto bg-gray-400 gap-1 p-2 border-1 border-black">
            <h1 className="text-center text-white font-bold">Block {blockNum}</h1>
            {Array.from({length: numWord}, (_, i) => i + 1).map((_, index) => (
                <Words key={index} value={index}/>
            ))}   
        </div>
    );
}

function Words({value}:{value:number}){
    return(
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            <h1>{value}</h1>
        </div>
    );
}