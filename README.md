# CSARCH2_CaseProject1_Group7

## Analysis Write-Up 
  This case project showcases a simulation of a cache memory machine that uses a 4-way block set-associative mapping function with the following specifications addressed. The block size is parameterized by the user and has a minimum of at least 2 words. It follows no strict maximum value but the value of the block size must be a power of 2. Similar to the block size, the number of cache blocks is parameterized by the user with a minimum of 2 words again. It also follows the same rule of the value being a power of 2 and no strict maximum. However, it is recommended that the user should input a value of 16 or more to these parameters. For the main memory size, it has a fixed value of 1024 blocks. The simulation also has an option to choose its read policy between non-load-through or load-through.

  In addition, the machine also uses the two replacement algorithms for overwriting data in the cache blocks: Least Recently Used (LRU) and Most Recently Used (MRU). For reference inside the simulation, the cache access time is 1τs and the memory access time per word is 10τs. Then, a main memory block sequence is inputted as a parameter to be mapped based from the selected read policy and replacement algorithm. After the sequence is executed, the machine will display the data of each cache block along with its total memory access count, cache hit count, cache miss count, cache hit rate, cache miss rate, average memory access time and total memory access time. 
  
# Test Cases

## 1.) Sequential Sequence
  The MM block sequence will follow an ascending order starting from 0 to 2n-1 where n represents the number of cache blocks parameterized. This sequence is repeated twice in its duration. 
  
  **Ex: n = 4: 0,1,2,3,4,5,6,7, 0,1,2,3,4,5,6,7**
## 2.) Mid-repeat Blocks
  The MM block sequence initially start at a sequence of 0 to n-1. Then, it repeats a sequential sequence twice after the initial block sequence. Afterward, the reversed sequence is added to complete it.
  
  **Ex: n = 4: 0,1,2,3, 0,1,2,3,4,5,6,7, 0,1,2,3,4,5,6,7, 3,2,1,0, 7,6,5,4,3,2,1,0, 7,6,5,4,3,2,1,0**
  
## 3.) Random Sequence
  The MM block sequence is composed of 64 randomly generated block accesses. The block indices must be within a range from 0 to 1023.

## Video Walkthrough
https://youtu.be/cF2oFwuYuTE 
  
