import { useEffect, useRef, forwardRef } from "react";

// NOTE: `cacheData` contains sets, ways, tags ; `numSet` is the number of sets to display.
export default function Cache({ 
    cacheData, 
    numSet, 
    activeSet, 
    activeWay 
}: { 
    cacheData?: any; 
    numSet: number; 
    activeSet?: number | null; 
    activeWay?: number | null 
}) {
    const sets = cacheData?.sets || []; // get data

    // sets the number of lists to display based on simulation
    const setList = sets.length > 0 ? sets : Array.from({ length: numSet }, (_, i) => ({ index: i }));

    // Reference to store DOM nodes for each Set
    const setRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // auto-scroll when activeSet changes and is valid
    useEffect(() => {
        if (activeSet !== null && activeSet !== undefined && setRefs.current[activeSet]) {
            setRefs.current[activeSet]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [activeSet]);

    return (
       
            <div className="bg-[#43598B] w-[26vw] h-[67vh] border-1 mt-1 flex justify-center items-center border-1 border-black">
                <div className="w-[25vw] h-[65vh] overflow-auto bg-[#43598B] gap-1 p-2  border-black">
                {setList.map((setData: any, index: number) => (
                    <Sets 
                        key={index} 
                        numSet={index} 
                        setData={setData} 
                        isActiveSet={activeSet === index}
                        activeWay={activeWay}
                        ref={(el) => {
                            setRefs.current[index] = el;
                        }}
                    />
                ))}
            </div>
            </div>
    );
}

// Wrap Sets component with forwardRef to pass DOM reference up to parent
const Sets = forwardRef<HTMLDivElement, { numSet: number; setData: any; isActiveSet?: boolean; activeWay?: number | null }>(
    ({ numSet, setData, isActiveSet, activeWay }, ref) => {

        // get 4 ways from data
        const ways = setData?.ways || Array.from({ length: 4 }, () => ({ tag: null, memoryBlock: null, valid: false }));

        return (
            <div ref={ref} className="bg-[#111844] w-full h-auto font-moderustic text-sm flex justify-center items-center text-white border-1 border-white my-1">
                {/* Column 1 */}
                <h1 className={`w-[50%] py-11 text-center font-bold ${isActiveSet ? "bg-green-600 py-2" : "text-white"}`}>
                    Set {numSet}
                </h1>

                 {/* Column 2 */}
                <div className="bg-[#111844] w-full h-auto flex flex-col justify-center items-center text-white border-l-1 border-white">
                    <h1 className="text-center text-white font-bold">Address</h1>
                    {ways.map((way: any, index: number) => (
                        <AddressBlock 
                            key={index} 
                            address={way.valid && way.tag !== null ? `${way.tag}` : "-"} 
                            isActive={isActiveSet && activeWay === index}
                        />
                    ))}
                </div>

                {/* Column 3*/}
                <div className="bg-[#111844] w-full h-auto flex flex-col justify-center items-center text-white border-l-1 border-black">
                    <h1 className="text-center text-white font-bold">Value</h1>
                    {ways.map((way: any, index: number) => (
                        <ValueBlock 
                            key={index} 
                            value={way.valid && way.memoryBlock !== null ? `Blk ${way.memoryBlock}` : "-"} 
                            isActive={isActiveSet && activeWay === index}
                        />
                    ))}   
                </div>
            </div>
        );
    }
);

Sets.displayName = "Sets";

// Helper function to display address
function AddressBlock({ address, isActive }: { address: string; isActive?: boolean }){
    return (
        <div className={`${isActive ? "bg-green-600 font-bold" : "bg-[#467DFD]"} w-full h-auto flex justify-center items-center text-white border-1 border-black transition-colors duration-200`}>
            <h1>{address}</h1>
        </div>
    );
}

// Helper function to display value
function ValueBlock({ value, isActive }: { value: string; isActive?: boolean }){
    return (
        <div className={`${isActive ? "bg-green-600 font-bold" : "bg-[#467DFD]"} w-full h-auto flex justify-center items-center text-white border-1 border-black transition-colors duration-200`}>
            <h1>{value}</h1>
        </div>
    );
}