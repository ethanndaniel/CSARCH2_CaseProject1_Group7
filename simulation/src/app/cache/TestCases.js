//Test Cases A, B, and C

export function sequentialSequence(n){

    //Test case a: sequential, n=4, so access 0..7, twice
    const sequence = [];
    for (let rep = 0; rep < 2; rep++) {
        for (let b = 0; b < 2 * n; b++) {
            sequence.push(b);
        }
    }
    return sequence;
}


export function midRepeatBlocks(n){

    //Test case b: n=4, so access 0..3, 0..7 twice, then reverse 3..0, 7..0 twice
    const sequence = [];

    //0..n-1
    for (let i = 0; i < n; i++) {
        sequence.push(i);
    }

    //0..2n-1
    for (let i = 0; i < 2 * n; i++) {
        sequence.push(i);
    }

    //0..2n-1 again
    for (let i = 0; i < 2 * n; i++) {
        sequence.push(i);
    }

    //reverse so n-1..0
    for (let i = n - 1; i >= 0; i--) {
        sequence.push(i);
    }

    //2n-1..0
    for (let i = (2 * n) - 1; i >= 0; i--) {
        sequence.push(i);
    }

    //2n-1..0
    for (let i = (2 * n) - 1; i >= 0; i--) {
        sequence.push(i);
    }

    return sequence;
}


export function randomSequence(){

    //Test case c: random, 64 random blocks from 0..1023
    const sequence = [];

    for (let i = 0; i < 64; i++) {
        const randomBlock = Math.floor(Math.random() * 1024); //random block from 0 to 1023
        sequence.push(randomBlock);
    }
    
    return sequence;
}