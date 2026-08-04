"use client"

import {useState} from "react";
import Input from "./helperComponents/Input";
import Console from "./helperComponents/Console";
import MainMemory from "./helperComponents/MainMemory";
import Cache from "./helperComponents/Cache";
import Block from "./helperComponents/Block";
import Arrow from "./helperComponents/Arrow";
import Summary from "./helperComponents/Summary";

export default function Home() {
  const [simulationResults, setSimulationResults] = useState(null); // response from route.js
  const [logs, setLogs] = useState<string[]>(["Hello World!"]);
  const [numWord, setNumWord] = useState<number>(4);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  const [showSummary, setShowSummary] = useState(false); // popup for summary tab

  // runs when user clicks simulate
  const handleRunSimulation = async (payload: any) => {
    try {
      // set blockSize from user input
      if (payload.blockSize) setNumWord(payload.blockSize); 

      // get route.js response
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // send data to route.js
      });
      const data = await response.json();

      setLogs((prev) => [...prev, "Running simulation..."]);

      if (data.success) {
        // update simulation
        setSimulationResults(data); 

        // get active block from last log
        if (data.logs?.length > 0) {
          setActiveBlock(data.logs[data.logs.length - 1].memoryBlock);
        }

        // format objects from logs to strings
        const formattedLogs = data.logs.map((log: any) => {
          const status = log.hit ? "HIT" : "MISS";
          const evictionInfo = log.evictedBlock !== null ? ` (Evicted block ${log.evictedBlock})` : "";
          return `Access #${log.accessNumber}: Memory Block ${log.memoryBlock} -> Set ${log.setIndex}, Way ${log.way} [${status}]${evictionInfo}`;
        });

        // print to the console 
        setLogs((prev) => [
          ...prev, 
          `Simulation complete! Ran ${data.logs.length} operations.`,
          ...formattedLogs
        ]);

      } else {
        // for any errors
        setLogs((prev) => [...prev, `Error: ${data.error}`]);
      }
    } catch (error: any) {
      console.error("Error in simulating", error);
      setLogs((prev) => [...prev, `Failed to connect: ${error.message}`]);
    }
  };

  // helper clearing the console
  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
  <div className="h-screen w-full bg-white flex justify-center items-center gap-2 py-2">
  
    {/* Toolbox view */}
    <div className="w-[27vw] min-h-screen bg-[#111844]">
      <Input onSubmit={handleRunSimulation}/>
    </div>

    {/* Main View */}
    <div className="w-[70vw] h-full bg-gray-300 flex flex-col justify-between overflow-auto">
      <div>
        <div className="w-full h-[10vh] p-2 flex justify-between items-center text-black font-bold">
          <h1 className=" px-10">Cache Simulator</h1>
          <div className="relative inline-block group px-10 rounded bg-green-500">
            <button>
              <h1 className="cursor-pointer">
                view
              </h1>
            </button>
            <div className="absolute top-5 left-0 w-full bg-green-500 rounded">
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
        <div className="h-[65vh] flex justify-between items-center gap-2 p-4">
          <Cache 
            numSet={simulationResults?.cacheState?.numberOfSets || 4} 
            cacheData={simulationResults?.cacheState}
          />
          <Arrow color="white"/>
          <Block blockNum={activeBlock ?? 0} numWord={numWord}/>
          <Arrow color="white"/>
          <MainMemory activeBlock={activeBlock}/>
        </div>

        {/*Summary */}
        <div className="w-full flex justify-end p-2 ">
          <button onClick={()=>setShowSummary(!showSummary)} className="cursor-pointer">
            <h1 className="px-5 text-black rounded hover:bg-blue-400 bg-green-500 cursor-pointer ">View Summary</h1>
          </button>
        </div>
      </div>
        
      {/* Console */}
      <div>
        <Console logs={logs} onClear={handleClearLogs}/>
      </div>

      {/* Summary Panel */}
      {showSummary&&(
        <div className="w-full h-full bg-black/50 absolute top-0 left-0 flex justify-center items-center">
          <div className="w-[50vw] h-[50vh] bg-white flex flex-col justify-between items-center p-5">
            {/*Close button */}
            <button onClick={()=>setShowSummary(!showSummary)} className="w-full cursor-pointer text-black flex justify-end">
              X
            </button>
            <Summary content={simulationResults?.stats || {}}/>
          </div> 
        </div>
      )}
    </div> 
  </div>
  );
}