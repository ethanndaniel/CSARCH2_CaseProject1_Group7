"use client"
import Image from "next/image";
import {useState} from "react";
import Input from "./helperComponents/Input";
import Console from "./helperComponents/Console";
import MainMemory from "./helperComponents/MainMemory";
import Cache from "./helperComponents/Cache";
import Block from "./helperComponents/Block";
import Arrow from "./helperComponents/Arrow";

export default function Home() {
  const [word, setWord] = useState("");

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center gap-2 py-2">

        {/* Toolbox view */}
        <div className="w-[27vw] min-h-screen bg-[#111844]">
          <Input/>
        </div>

        {/* Main View */}
        <div className="w-[70vw] h-full bg-gray-300 flex flex-col justify-between overflow-auto">
          <div className="w-full h-[10vh] p-2 flex justify-between items-center text-white font-bold text-xl">
            <h1 className=" px-10">Cache Simulator</h1>
            <div className="relative inline-block group px-10 rounded bg-green-500">
              <button>
                <h1 className="cursor-pointer hover:text-gray-400">
                  view
                </h1>
              </button>
              <div className="absolute top-7 left-0 w-full bg-green-500 rounded">
                <button className="w-full block hidden group-hover:block bg-green-500 cursor-pointer hover:bg-blue-400">
                  <h1>Step by Step</h1>
                </button>
                <button className="w-full block hidden group-hover:block bg-green-500 cursor-pointer hover:bg-blue-400">
                  <h1>Final BSA</h1>
                </button>
              </div>
            </div>
          </div>
          {/* Simulator */}
          <div className="flex justify-between items-center gap-2 p-4">
            <Cache address={""} value={""} numSet={4}/>
            <Arrow/>
            <Block blockNum={1} numWord={4}/>
            <Arrow/>
            <MainMemory/>
          </div>

          {/* Console */}
          <div>
            <Console/>
          </div>
      </div> 
    </div>
  );
}
