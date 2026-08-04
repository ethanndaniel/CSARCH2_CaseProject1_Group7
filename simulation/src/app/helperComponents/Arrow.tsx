export default function Arrow({color}:{color?:string}){
    return(
        <div className="w-[5vw] h-[70vh] flex justify-center items-center">
            <div className="w-[5vw] h-[70vh] flex justify-center items-center">
                <svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z" fill={color}/>
                </svg>
            </div>
        </div>
    );
}