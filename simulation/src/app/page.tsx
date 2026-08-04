"use client"

import {useState, useEffect} from "react";
import Input from "./helperComponents/Input";
import Console from "./helperComponents/Console";
import MainMemory from "./helperComponents/MainMemory";
import Cache from "./helperComponents/Cache";
import Block from "./helperComponents/Block";
import Summary from "./helperComponents/Summary";

export default function Home() {
  const [simulationResults, setSimulationResults] = useState(null); // response from route.js
  const [logs, setLogs] = useState<string[]>(["Hello World!"]);
  const [numWord, setNumWord] = useState<number>(4);


  // Highlights for animation
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [activeSet, setActiveSet] = useState<number | null>(null);
  const [activeWay, setActiveWay] = useState<number | null>(null);
  const [isBlockActive, setIsBlockActive] = useState<boolean>(false);
  const [currentCacheState, setCurrentCacheState] = useState<any>(null);

  const [showSummary, setShowSummary] = useState(false); // popup for summary tab
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [replacementPolicy, setReplacementPolicy] = useState<string>("CSARCH2");

  // Helper to build partial cache state up to stepIndex
  const getCacheStateAtStep = (baseCache: any, logs: any[], stepIndex: number) => {
    if (!baseCache || !logs || logs.length === 0) return baseCache;

    const numberOfSets = baseCache.numberOfSets;
    const waysCount = baseCache.ways;

    const animatedSets = Array.from({ length: numberOfSets }, () => ({
      ways: Array.from({ length: waysCount }, () => ({
        valid: false,
        tag: null,
        memoryBlock: null,
        lastAccess: 0,
      })),
    }));

    for (let i = 0; i <= stepIndex && i < logs.length; i++) {
      const log = logs[i];
      if (animatedSets[log.setIndex] && animatedSets[log.setIndex].ways[log.way]) {
        animatedSets[log.setIndex].ways[log.way] = {
          valid: true,
          tag: log.tag,
          memoryBlock: log.memoryBlock,
          lastAccess: log.accessNumber,
        };
      }
    }
  return {
      ...baseCache,
      sets: animatedSets,
    };
  };

  // Helper function to anim pulse
  const triggerBlockPulse = () => {
    setIsBlockActive(true);
    // Turn off highlight after 1s
    setTimeout(() => {
      setIsBlockActive(false);
    }, 500);
  };

  // ANIMATION FUNCTION
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && simulationResults?.logs.length) {
      let stepCounter = 0; // current step counter

      // play each step for 1 second sequentially
      timer = setInterval(() => {
        stepCounter++;

        // Stop playing at end of logs
        if (stepCounter >= simulationResults.logs.length) {
          setIsPlaying(false);
          setIsBlockActive(false);
          clearInterval(timer);
          return;
        }

        triggerBlockPulse();
        

        // Get log item for current step
        const currentLog = simulationResults.logs[stepCounter];
        setActiveBlock(currentLog.memoryBlock);
        setActiveSet(currentLog.setIndex);
        setActiveWay(currentLog.way);

        // Update cache state
        const updatedCache = getCacheStateAtStep(
          simulationResults.cacheState,
          simulationResults.logs,
          stepCounter
        );
        setCurrentCacheState(updatedCache);

        // Update console
        const status = currentLog.hit ? "HIT" : "MISS";
        const evictionInfo = currentLog.evictedBlock !== null ? ` (Evicted block ${currentLog.evictedBlock})` : "";
        const logMsg = `Step ${stepCounter + 1} / ${simulationResults.logs.length}: Block ${currentLog.memoryBlock} -> Set ${currentLog.setIndex}, Way ${currentLog.way} [${status}]${evictionInfo}`;

        setCurrentStep(stepCounter);
        setLogs((prev) => [...prev, logMsg]);
      }, 1000); // animation speed 1 sec
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, simulationResults]);

  const startAnimation = () => {
    if (!simulationResults || !simulationResults.logs?.length) {
      setLogs((prev) => [...prev, "Run a simulation first!"]);
      return;
    }

    // reset step
    setCurrentStep(0);

    // set initial states
    const firstLog = simulationResults.logs[0];
    setActiveBlock(firstLog.memoryBlock);
    setActiveSet(firstLog.setIndex);
    setActiveWay(firstLog.way);

    const initialCache = getCacheStateAtStep(
      simulationResults.cacheState,
      simulationResults.logs,
      0
    );
    setCurrentCacheState(initialCache);

    // display first log entry
    const status = firstLog.hit ? "HIT" : "MISS";
    const evictionInfo = firstLog.evictedBlock !== null ? ` (Evicted block ${firstLog.evictedBlock})` : "";
    const firstLogMsg = `Step 1 / ${simulationResults.logs.length}: Block ${firstLog.memoryBlock} -> Set ${firstLog.setIndex}, Way ${firstLog.way} [${status}]${evictionInfo}`;
    
    setLogs(["Starting animation...", firstLogMsg]);

    // start animation
    setIsPlaying(true);
  };

  // runs when user clicks simulate
  const handleRunSimulation = async (payload: any) => {
    try {
      // set blockSize from user input
      if (payload.blockSize) setNumWord(payload.blockSize); 
      if (payload.replacementPolicy) setReplacementPolicy(payload.replacementPolicy); 

      // Stop animation
      setIsPlaying(false);

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
          const lastLog = data.logs[data.logs.length - 1];
          setActiveBlock(lastLog.memoryBlock);
          setActiveSet(lastLog.setIndex);
          setActiveWay(lastLog.way);
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
  <div className="min-h-screen w-full bg-white flex justify-center gap-2 py-2">
  
    {/* Toolbox view */}
    <div className="w-[27vw] h-auto bg-[#111844]">
      <Input onSubmit={handleRunSimulation}/>
    </div>

    {/* Main View */}
    <div className="w-[70vw] h-full flex flex-col justify-between overflow-auto font-moderustic text-sm">
      <div>
        <div className="w-full h-[10vh] p-2 flex justify-between items-center text-white">
          <h1 className=" px-5 font-gloock text-4xl text-black">{replacementPolicy==="LRU"?(<p>Least Recently Used (LRU)</p>):replacementPolicy==="MRU"?(<p>Most Recently Used (MRU)</p>):(<h1>CSARCH2</h1>)}</h1>

          {/* Drop Down */}
          <div className="relative inline-block group px-10 rounded bg-[#111844] hover:bg-[#0A0F30]">
            <button>
              <h1 className="cursor-pointer">{isPlaying ? "Simulating..." : "View"}</h1>
            </button>
            <div className="absolute top-5 left-0 w-full bg-green-500 rounded">
              <button 
                onClick={startAnimation}
                className="w-full block hidden group-hover:block bg-green-500 cursor-pointer hover:bg-blue-400 p-1 text-xs"
              >
                <h1>Step by Step</h1>
              </button>
              <button 
                onClick={() => setIsPlaying(false)} 
                className="w-full block hidden group-hover:block bg-red-500 cursor-pointer hover:bg-red-400 p-1 text-xs text-white"
              >
                <h1>Pause / Final BSA</h1>
              </button>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <div className="h-[65vh] flex justify-between items-center gap-1 p-4 mt-5 mb-5">
          {/*Cache */}
          <div className="bg-white ">
            <h1 className="w-full bg-[#43598B] h-full text-center text-white font-moderustic text-body font-semibold  border-1 border-black">Cache</h1>
            <Cache 
            numSet={simulationResults?.cacheState?.numberOfSets || 4} 
            cacheData={isPlaying ? currentCacheState : simulationResults?.cacheState}
            activeSet={activeSet}
            activeWay={activeWay}
          />
          </div>
          {/*Block */}
          <div className="bg-white">
            <Block 
            blockNum={activeBlock ?? 0} 
            numWord={numWord} 
            isActive={isBlockActive}
            />
          </div>
          {/*Main Memory */}
          <div className="bg-white">
            <h1 className="w-full bg-[#43598B] h-full text-center text-white font-moderustic text-body font-semibold border-1 border-black">Main Memory</h1>
            <MainMemory activeBlock={activeBlock}/>
          </div>
        </div>

        {/*Summary */}
        <div className="w-full flex justify-end p-2 ">
          <button onClick={()=>setShowSummary(!showSummary)} className="cursor-pointer">
            <h1 className="px-5 text-white rounded hover:bg-[#0A0F30] bg-[#111844] cursor-pointer font-moderustic text-sm ">Summary</h1>
          </button>
        </div>
      </div>
        
      {/* Console */}
      <div className="h-full">
        <Console logs={logs} onClear={handleClearLogs}/>
      </div>

      {/* Summary Panel */}
      {showSummary&&(
        <div className="w-full min-h-screen bg-black/50 fixed top-0 left-0 flex justify-center items-center">
          <div className="w-[50vw] h-[55vh]  bg-[#43598B] flex flex-col justify-between items-center px-5 py-3">
            {/*Close button */}
            <button onClick={()=>setShowSummary(!showSummary)} className="w-full cursor-pointer text-white flex justify-end font-bold">
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

