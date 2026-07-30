"use client"
import Image from "next/image";
import {useState} from "react";
import Input from "./helperComponents/Input";

export default function Home() {
  const [word,setWord]=useState("");
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center gap-2 py-2">
        <div className="w-[27vw] min-h-screen bg-[#111844]">
          <Input/>
        <div>
    </div>

        </div>
        <div className="w-[70vw] min-h-screen bg-black">
              {word}
        </div>
    </div>
  );
}
