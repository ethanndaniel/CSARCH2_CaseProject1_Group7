import { NextResponse } from "next/server";
import { createSimulator } from "../../cache/CacheSimulator";
import { ReplacementPolicy } from "../../cache/ReplacementPolicy"; 
import { createCache } from "../../cache/Cache";
import { sequentialSequence } from "../../cache/TestCases";

export async function POST(request) {
  try {
    const body = await request.json();

    const { blockSize, totalCacheBlocks, readPolicy } = body;

    const cache = createCache({
      blockSize: blockSize,
      totalCacheBlocks: totalCacheBlocks,
      readPolicy: readPolicy === "load-through" ? "LOAD_THROUGH" : "NON_LOAD_THROUGH"
    });

    const simulator = createSimulator(cache, ReplacementPolicy.LRU);
    const sequence = sequentialSequence(cache.numberOfSets);

    // run simulation
    sequence.forEach((blockNumber) => {
      simulator.accessMemoryBlock(blockNumber);
    });

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