export default function Block({ blockNum, numWord, isActive }: { blockNum: number, numWord: number, isActive?: boolean }){
    return (
        <div className="bg-white ">
            <h1 className="text-center text-white  mt-2 bg-[#43598B] font-moderustic text-body font-semibold  border-1 border-black">Block {blockNum}</h1>
            <div className="w-[16vw] bg-[#43598B] flex justify-center items-center mt-1 border-1 border-blacks">
                <div className="w-[15vw] bg-[#111844] h-fit overflow-auto gap-1 p-2 border-1 border-white font-moderustic text-sm mt-2 mb-2">
                    {Array.from({ length: numWord }, (_, i) => i).map((index) => (
                        <Words key={index} value={index} isActive={isActive} />
                    ))}   
                </div>
            </div>
        </div>
    );
}

// helper function to display words
function Words({ value, isActive }: { value: number, isActive?: boolean }) {
    return (
        <div className={`${isActive ? "bg-green-600 font-bold" : "bg-[#467DFD]"} 
            w-full h-auto flex justify-center items-center text-white border-1 
            border-black transition-colors duration-200`}>
            <h1>Word {value}</h1>
        </div>
    );
}