import { useEffect, useRef, forwardRef } from "react";

// NOTE: `activeBlock` number of block that is being accessed 
export default function MainMemory({ activeBlock }: { activeBlock?: number | null }){
    
    // Reference to DOM nodes for all 1024 blocks
    const blockRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // auto-scroll when activeBlock changes and is valid
    useEffect(() => {
        if (activeBlock !== null && activeBlock !== undefined && blockRefs.current[activeBlock]) {
            blockRefs.current[activeBlock]?.scrollIntoView({
                block: "nearest", 
            });
        }
    }, [activeBlock]);
    
    return (
        <div className="w-[15vw] h-full overflow-auto bg-gray-400 gap-1 p-2 border-1 border-black">
            <h1 className="text-center text-white font-bold">Main Memory</h1>
            {Array.from({ length: 1024 }, (_, i) => i).map((num) => (
                <Blocks 
                    key={num} 
                    num={num} 
                    isActive={activeBlock === num}
                    // Attach reference to each block element
                    ref={(el) => {
                        blockRefs.current[num] = el;
                    }}
                />
            ))}
        </div>
    );
}

const Blocks = forwardRef<HTMLDivElement, { num: number; isActive?: boolean }>(
    ({ num, isActive }, ref) => {
        return (
            <div 
                ref={ref}
                className={`${isActive ? "bg-green-600 font-bold" : "bg-blue-500"} 
                w-full h-auto flex justify-center items-center text-white border-1 
                border-black transition-colors duration-200`}
            >
                <h1>Block {num}</h1>
            </div>
        );
    }
);

Blocks.displayName = "Blocks";