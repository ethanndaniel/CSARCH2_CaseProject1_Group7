"use client"
import {useState} from "react";

interface InputProps {
  onSubmit: (payload: any) => Promise<void>; 
}

export default function Input({ onSubmit }: InputProps){
    const [word, setWord] = useState("");
    const [block, setBlock] = useState("");
    const [selected, setSelected] = useState("non-load-through");
    const [testCase, setTestCase] = useState("sequential");
    const [replacementPolicy, setReplacementPolicy] = useState("LRU");

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
            readPolicy: selected,
            testCase: testCase,
            replacementPolicy: replacementPolicy
        };
        await onSubmit(payload); 
    };

    return (
    <div className="w-full h-fit px-10">
        <label> Title Here</label>
        
        {/* Input for setting the number of word per block */}
        <label className="block text-white-800 font-semibold text-sm">Input the number of words per block</label>
        <div className="mt-2">
            <input
                type="text"
                name="word"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-white-800"
                value={word}
                onChange={(e) => setWord(e.target.value)}/>
        </div>
        
            {/* Input for setting the number of block per cache */}
        <label className="block text-white-800 font-semibold text-sm mt-2">Input the number of blocks per cache</label>
        <div className="mt-2">
            <input
                type="text"
                name="block"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-white-800"
                value={block}
                onChange={(e) => setBlock(e.target.value)}/>
        </div>

        {/* Dropdown for selecting sequence */}
        <label className="block text-white-800 font-semibold text-sm mt-2">Select Sequence:</label>
        <div className="mt-2">
        <select
            value={testCase}
            onChange={(e) => setTestCase(e.target.value)}
            className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 bg-white text-black text-sm focus:outline-none"
        >
            <option value="sequential">Sequential Sequence</option>
            <option value="midRepeat">Mid-Repeat Blocks</option>
            <option value="random">Random Sequence</option>
        </select>
        </div>

        {/* Replacement Policy Dropdown */}
        <label className="block text-white-800 font-semibold text-sm mt-2">Replacement Policy:</label>
        <div className="flex items-center mb-1">
            <input 
                id="radio-lru" 
                type="radio" 
                name="replacement" 
                value="LRU" 
                checked={replacementPolicy === "LRU"} 
                onChange={(e) => setReplacementPolicy(e.target.value)}
                className="w-4 h-4"
            />
            <label htmlFor="radio-lru" className="select-none ms-2 text-sm font-medium">LRU (Least Recently Used)</label>
        </div>
        <div className="flex items-center">
            <input 
            id="radio-mru" 
            type="radio" 
            name="replacement" 
            value="MRU" 
            checked={replacementPolicy === "MRU"} 
            onChange={(e) => setReplacementPolicy(e.target.value)}
            className="w-4 h-4"
            />
            <label htmlFor="radio-mru" className="select-none ms-2 text-sm font-medium">MRU (Most Recently Used)</label>
        </div>
        
        {/* non-load-through or load-through setting */}
        <label className="block text-white-800 font-semibold text-sm mt-2"> Read Policy:</label>
        <div className="flex items-center mb-2">
            {/*Radio for non-load-through */}
            <input id="default-radio-1" 
                type="radio" 
                value="non-load-through" 
                checked={selected === "non-load-through"} 
                onChange={(e) => setSelected(e.target.value)} 
                className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none checked:bg-white checked:border-black"
            />
            <label className="select-none ms-2 text-sm font-medium text-heading">non-load-through</label>
        </div>
        <div className="flex items-center">
            {/*Radio for load-through */}
            <input id="default-radio-2" 
                type="radio" 
                value="load-through" 
                checked={selected === "load-through"} 
                onChange={(e) => setSelected(e.target.value)} 
                className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none checked:bg-white checked:border-black"
            />
            <label className="select-none ms-2 text-sm font-medium text-heading">load-through</label>
        </div>

        {/* CONFIGURATION DISPLAY */}
        <div>
            <span>
                <br/>Main Memory Information:
                <br/>Total Blocks in Main Memory: 1024
                <br/>Number of words per block: {word}
            </span>
            <span>
                <br/><br/>Cache Memory Information:
                <br/>Total Set in a Cache: {(parseInt(block, 10) || 0) / 4}
                <br/>Total Block in a Cache: {block}
                <br/>Number of block per set: 4
            </span>
        </div>

        {/* BUTTON */}
        <div className= "flex justify-end py-2 px-5"> 
            <button onClick={handleRunSimulation} className="cursor-pointer">
                Run Simulation 
            </button> 
        </div>
    </div>
    );
}
