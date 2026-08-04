// NOTE: `activeBlock` number of block that is being accessed 
export default function MainMemory({ activeBlock }: { activeBlock?: number | null }){
    return(
        <div className="w-[15vw] h-full overflow-auto bg-gray-400 gap-1 p-2 border-1 border-black">
            <h1 className="text-center text-white font-bold">Main Memory</h1>
            {Array.from({ length: 1024 }, (_, i) => i).map((num) => ( // create 1024 blocks in memory
                <Blocks key={num} num={num} isActive={activeBlock === num} />
            ))}
        </div>
    );
}

// Helper function for rendering block
function Blocks({ num, isActive }: { num: number; isActive?: boolean }){
    return(
        // bg color is green when active
        <div className={`${isActive ? "bg-green-600 font-bold" : "bg-blue-500"}
            w-full h-auto flex justify-center items-center text-white border-1 
            border-black transition-colors duration-200`}>
            <h1>Block {num}</h1>
        </div>
    );
}