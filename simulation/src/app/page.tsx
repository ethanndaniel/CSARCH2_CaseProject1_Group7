"use client"
import Image from "next/image";
import {useState} from "react";
import Input from "./helperComponents/Input";
import Console from "./helperComponents/Console";

export default function Home() {
  const [word, setWord] = useState("");

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center gap-2 py-2">

        {/* Toolbox view */}
        <div className="w-[27vw] min-h-screen bg-[#111844]">
          <Input/>
        </div>

        {/* Main View */}
        <div className="w-[70vw] h-full bg-gray-300 flex flex-col justify-between overflow-hidden">

          {/* Simulator */}
          <div className="flex-1 p-4 overflow-auto text-white">
            {word}
          </div>

          {/* Console */}
          <div>
            <Console/>
          </div>
      </div> 
    </div>
  );
}
