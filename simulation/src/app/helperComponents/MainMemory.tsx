


export default function MainMemory(){
    return(
        <div>
            {Array.from({length: 1024}, (_, i) => i + 1).map((num, index) => (
                <Blocks key={index} num={index+1}/>
            ))}
        </div>
    );
}


function Blocks({num}:{num:number}){
    return(
        <div className="bg-blue-500 w-[5vw] h-[5vw] flex justify-center items-center text-white">
            <h1>{num}</h1>
        </div>
    );
}