

export default function Cache({address, value, numSet}:{address:String, value:String, numSet:number}){
    return(
        <div>
            <div className="w-[25vw] h-[65vh] overflow-auto bg-gray-400 gap-1 p-2 border-1 border-black">
                <h1 className="text-center text-white font-bold">Cache</h1>
                {Array.from({length: numSet}, (_, i) => i + 1).map((num, index) => (
                <Sets key={index} numSet={index} address={address} value={value}/>
                ))}
            </div>
        </div>
    );
}

function Sets({numSet, address, value}:{numSet:number, address:String, value:String}){
    return(
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            <h1 className="w-[50%] text-center text-white font-bold">Set {numSet}</h1>
            <div className="bg-blue-500 w-full h-auto flex flex-col justify-center items-center text-white border-l-1 border-black">
                <h1 className="text-center text-white font-bold">Address</h1>
                {Array.from({length: 4}, (_, i) => i + 1).map((_, index) => (
                <AddressBlock key={index} address={address}/>
                ))}
            </div>
            <div className="bg-blue-500 w-full h-auto flex flex-col justify-center items-center text-white border-l-1 border-black">
                <h1 className="text-center text-white font-bold">Value</h1>
                {Array.from({length: 4}, (_, i) => i + 1).map((_, index) => (
                <ValueBlock key={index} value={value}/>
                ))}   
            </div>
        </div>
    );
}

function AddressBlock({address}:{address:String}){
    return(
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            <h1>{address? address:"-"}</h1>
        </div>
    );
}

function ValueBlock({value}:{value:String}){
    return(
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            <h1>{value? value:"-"}</h1>
        </div>
    );
}