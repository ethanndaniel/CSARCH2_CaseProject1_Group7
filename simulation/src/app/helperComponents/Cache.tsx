
// NOTE: `cacheData` contains sets, ways, tags ; `numSet` is the number of sets to display.
export default function Cache({ cacheData, numSet }: { cacheData?: any; numSet: number }){
    const sets = cacheData?.sets || []; // get data

    // sets the number of lists to display based on simulation
    const setList = sets.length > 0 ? sets : Array.from({ length: numSet }, (_, i) => ({ index: i }));

    return (
        <div>
            <div className="w-[25vw] h-[65vh] overflow-auto bg-gray-400 gap-1 p-2 border-1 border-black">
                <h1 className="text-center text-white font-bold">Cache</h1>
                {setList.map((setData: any, index: number) => ( // render the sets
                    <Sets key={index} numSet={index} setData={setData} />
                ))}
            </div>
        </div>
    );
}

function Sets({ numSet, setData }: { numSet: number; setData: any }){
    // get 4 ways from data
    const ways = setData?.ways || Array.from({ length: 4 }, () => ({ tag: null, memoryBlock: null, valid: false }));

    return (
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            {/* Column 1 */}
            <h1 className="w-[50%] text-center text-white font-bold">Set {numSet}</h1>

            {/* Column 2 */}
            <div className="bg-blue-500 w-full h-auto flex flex-col justify-center items-center text-white border-l-1 border-black">
                <h1 className="text-center text-white font-bold">Address</h1>
                {ways.map((way: any, index: number) => ( // loop through each way
                    <AddressBlock key={index} address={way.valid && way.tag !== null ? `${way.tag}` : "-"} />
                ))}
            </div>

            {/* Column 3*/}
            <div className="bg-blue-500 w-full h-auto flex flex-col justify-center items-center text-white border-l-1 border-black">
                <h1 className="text-center text-white font-bold">Value</h1>
                {ways.map((way: any, index: number) => ( // loop through each way
                    <ValueBlock key={index} value={way.valid && way.memoryBlock !== null ? `Blk ${way.memoryBlock}` : "-"} />
                ))}   
            </div>
        </div>
    );
}

// Helper function to display address
function AddressBlock({address}:{address:String}){
    return(
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            <h1>{address}</h1>
        </div>
    );
}

// Helper function to display value
function ValueBlock({value}:{value:String}){
    return(
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            <h1>{value}</h1>
        </div>
    );
}