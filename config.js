
const MINE_RATE=1000; // 1s =1000ms
const INITIAL_DIFFICULTY=2;
const GENESIS_DATA={
    timeStamp:1,
    prevHash:'0x000',
    hash:"0x123",
    nonce:0,
    difficulty:INITIAL_DIFFICULTY,
    data:[],

};

module.exports={GENESIS_DATA , MINE_RATE};