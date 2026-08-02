"use client"
import {useState} from "react";

export default function Input(){
    const[word,setWord]=useState("");
    const[block,setBlock]=useState("");
    const[selected, setSelected]=useState("");
    return(
        <div className="gap-5">
        <label> Title Here</label>
            {/* Input for setting the number of word per block */}
        <label className="block text-white-800 font-semibold text-sm">Input the number of words per block</label>
          <div className="mt-2">
            <input
              type="text"
              name="word"
              className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-white-800"
              value={word}
              onChange={(e)=>setWord(e.target.value)}/>
          </div>
          <label className="pt-1 block text-white-500 text-sm">Some Description</label>
             {/* Input for setting the number of block per cache */}
          <label className="block text-white-800 font-semibold text-sm mt-2">Input the number of blocks per cache</label>
          <div className="mt-2">
            <input
              type="text"
              name="block"
              className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-white-800"
              value={block}
              onChange={(e)=>setBlock(e.target.value)}/>
          </div>
          <label className="pt-1 block text-white-500 text-sm">Some Description</label>

           {/* Setting whether it is non-load-through or load-through*/}
          <label className="block text-white-800 font-semibold text-sm mt-2"> Read Policy:</label>
          <div className="flex items-center mb-2">
            {/*Radio for non-load-through */}
            <input id="default-radio-1" type="radio" value="non-load-through" checked={selected==="non-load-through"} onChange={(e)=>setSelected(e.target.value)}
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none checked:bg-white checked:border-black"/>
            <label className="select-none ms-2 text-sm font-medium text-heading">non-load-through</label>
        </div>
        <div className="flex items-center">
             {/*Radio for load-through */}
            <input id="default-radio-2" type="radio" value="load-through" checked={selected==="load-through"} onChange={(e)=>setSelected(e.target.value)}
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none checked:bg-white checked:border-black"/>
            <label className="select-none ms-2 text-sm font-medium text-heading">load-through</label>
        </div>
        <div>
            <span>
                <br/>Main Memory Information:
                <br/>Total Blocks in Main Memory: 1024
                <br/>Number of words per block:{word}
            </span>
            <span>
                <br/><br/>Cache Memory Information:
                <br/>Total Set in a Cache: 
                <br/>Total Block in a Cache:{block}
                <br/>Number of block per set: 4
            </span>
        </div>
        <div className= "flex justify-end py-2 px-5">
            <button className="cursor-pointer">
            Simulate
            </button>
        </div>
        </div>
    );
}
