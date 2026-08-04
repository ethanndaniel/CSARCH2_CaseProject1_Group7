export default function Block({ blockNum, numWord, isActive }: { blockNum: number, numWord: number, isActive?: boolean }){
    return (
        <div className="w-[15vw] h-fit overflow-auto bg-gray-400 gap-1 p-2 border-1 border-black">
            <h1 className="text-center text-white font-bold">Block {blockNum}</h1>
            {Array.from({ length: numWord }, (_, i) => i).map((index) => (
                <Words key={index} value={index} isActive={isActive} />
            ))}   
        </div>
    );
}

// helper function to display words
function Words({ value, isActive }: { value: number, isActive?: boolean }) {
    return (
        <div className={`${isActive ? "bg-green-600 font-bold" : "bg-blue-500"} 
            w-full h-auto flex justify-center items-center text-white border-1 
            border-black transition-colors duration-200`}>
            <h1>Word {value}</h1>
        </div>
    );
}