"use client"
import {useState} from "react";

interface InputProps {
  onSubmit: (payload: any) => Promise<void>; 
}

export default function Input({ onSubmit }: InputProps){
    const [word, setWord] = useState("");
    const [block, setBlock] = useState("");
    const [selected, setSelected] = useState("non-load-through");

    const handleRunSimulation = async () => {
        const parsedWord = parseInt(word, 10) || 0;
        const parsedBlock = parseInt(block, 10) || 0;
        const ways = 4;
        const numberOfSets = parsedBlock > 0 ? Math.floor(parsedBlock / ways) : 0;

        const payload = {
            blockSize: parsedWord,
            totalCacheBlocks: parsedBlock,
            mainMemoryBlocks: 1024,
            ways: ways,
            numberOfSets: numberOfSets,
            readPolicy: selected
        };
        await onSubmit(payload); 
    };

    return (
        <div className="w-full px-3">
        <div className="py-5 flex">
            <label className="font-gloock text-4xl text-center">4-WAY BSA LRU & MRU</label>
        </div>
            {/* Input for setting the number of word per block */}
        <label className="block font-mate-sc text-base text-white-800 font-semibold ">Input the number of words per block</label>
          <div className="mt-2">
            <input
                type="text"
                name="word"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-white-800"
                value={word}
                onChange={(e) => setWord(e.target.value)}/>
          </div>
          <label className="pt-1 block text-white-500 font-mate-sc text-sm">Some Description</label>
             {/* Input for setting the number of block per cache */}
          <label className="block text-white-800 font-mate-sc text-base mt-2 font-semibold">Input the number of blocks per cache</label>
          <div className="mt-2">
            <input
                type="text"
                name="block"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-white-800"
                value={block}
                onChange={(e) => setBlock(e.target.value)}/>
          </div>
          <label className="pt-1 block text-white-500 font-mate-sc text-sm">Some Description</label>

           {/* Setting whether it is non-load-through or load-through*/}
          <label className="block text-white-800 font-mate-sc text-base font-semibold mt-2"> Read Policy:</label>
          <div className="flex items-center mb-2">
            {/*Radio for non-load-through */}
            <input id="default-radio-1" type="radio" value="non-load-through" checked={selected === "non-load-through"} onChange={(e) => setSelected(e.target.value)}
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none checked:bg-white checked:border-black"/>
            <label className="select-none ms-2 font-mate-sc text-sm">non-load-through</label>
        </div>
        <div className="flex items-center">
             {/*Radio for load-through */}
            <input id="default-radio-2" type="radio" value="load-through" checked={selected === "load-through"} onChange={(e) => setSelected(e.target.value)}
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none checked:bg-white checked:border-black"/>
            <label className="select-none ms-2 font-mate-sc text-sm">load-through</label>
        </div>
        <div className= "flex justify-end font-mate-sc text-base font-semibold">
            <button onClick={handleRunSimulation} className="cursor-pointer">
            Simulate
            </button>
        </div>
        <div >
            <p className="font-mate-sc text-base font-semibold"><br/>Main Memory Information:</p>
            <span className="font-mate-sc text-sm">
                Total Blocks in Main Memory: 1024
                <br/>Number of words per block: {word}
            </span>
            <p className="font-mate-sc text-base font-semibold"><br/>Cache Memory Information:</p>
            <span className="font-mate-sc text-sm">
                Total Set in a Cache: {(parseInt(block, 10) || 0) / 4}
                <br/>Total Block in a Cache: {block}
                <br/>Number of block per set: 4
            </span>
        </div>
        </div>
    );
}
