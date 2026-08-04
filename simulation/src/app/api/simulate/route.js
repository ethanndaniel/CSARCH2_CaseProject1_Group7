import { NextResponse } from "next/server";
import { createSimulator } from "../../cache/CacheSimulator";
import { ReplacementPolicy } from "../../cache/ReplacementPolicy"; 
import { createCache } from "../../cache/Cache";
import { sequentialSequence, midRepeatBlocks, randomSequence } from "../../cache/TestCases";

export async function POST(request) { // Next.js app router, listens for requests
  try {
    // Read and extract the request
    const body = await request.json(); 
    const { blockSize, totalCacheBlocks, readPolicy, testCase } = body;

    // Create cache block
    const cache = createCache({
      blockSize: blockSize,
      totalCacheBlocks: totalCacheBlocks,
      readPolicy: readPolicy === "load-through" ? "LOAD_THROUGH" : "NON_LOAD_THROUGH"
    });

    // Create simulator and sequence
    const simulator = createSimulator(cache, ReplacementPolicy.LRU);
    let sequence = [];
    if (testCase === "midRepeat") {
      sequence = midRepeatBlocks(cache.totalCacheBlocks);
    } else if (testCase === "random") {
      sequence = randomSequence();
    } else {
      sequence = sequentialSequence(cache.totalCacheBlocks);
    }

    // iterate through each block and run simulation
    sequence.forEach((blockNumber) => {
      simulator.accessMemoryBlock(blockNumber);
    });

    // return response
    return NextResponse.json({
      success: true,
      stats: simulator.getStats(),
      logs: simulator.getLog(),
      cacheState: cache,
    });
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}