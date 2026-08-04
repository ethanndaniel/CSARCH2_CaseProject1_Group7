"use client"
import React, { useState } from 'react'

interface ConsoleProps {
  logs?: string[];
  onClear?: () => void;
}

const Console = ({ logs = [], onClear }: ConsoleProps) => {
  return (
    <div className="h-48 min-h-[120px] max-h-[40vh] bg-gray-950 border-t border-gray-800 p-4 flex flex-col justify-between">

        <div className="flex justify-between border-t border-gray-800 items-center mb-2 pb-1">
            <span className="text-gray-300">Console</span>
            <button onClick={onClear}>
                Clear
            </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 text-green-400 whitespace-pre-wrap">
            {logs.map((log, index) => ( // loops through string array
            <div key={index} className="leading-tight">
                <span className="text-gray-600 select-none">&gt; </span>
                {log}
            </div>
            ))}
        </div>
    </div>
  )
}

export default Console