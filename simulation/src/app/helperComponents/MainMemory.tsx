
export default function MainMemory(){
    return(
        <div className="w-[15vw] h-[70vh] overflow-auto bg-gray-400 gap-1 p-2 border-1 border-black">
            <h1 className="text-center text-white font-bold">Main Memory</h1>
            {Array.from({length: 1024}, (_, i) => i + 1).map((num, index) => (
                <Blocks key={index} num={index}/>
            ))}
        </div>
    );
}


function Blocks({num}:{num:number}){
    return(
        <div className="bg-blue-500 w-full h-auto flex justify-center items-center text-white border-1 border-black">
            <h1>{num}</h1>
        </div>
    );
}