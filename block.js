// * importing genisis data and CryptoHash from thier respective files

const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto_hash");
const hexToBinary=require("hex-to-binary");



class Block{
    constructor({timeStamp,prevHash,hash,data,nonce,difficulty})
    {
        this.timeStamp=timeStamp;
        this.prevHash=prevHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genisis()
    {
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock,data})
    {
        let timeStamp,hash;
        const prevHash=prevBlock.hash;
        let {difficulty}=prevBlock;
        let nonce=0;
        do{
            nonce++;
            timeStamp=Date.now();
            difficulty=Block.addDifficulty({originalBlock:prevBlock,timeStamp});
            hash=cryptoHash(timeStamp,data,prevHash,nonce,difficulty);
        }while(hexToBinary(hash).substring(0,difficulty)!=="0".repeat(difficulty));
        return new this({
            timeStamp,
            prevHash,
            data,
            hash,
            nonce,
            difficulty,
        });

    }

    // * ADJUST DIFFICULTY 

    static addDifficulty({originalBlock,timeStamp})
    {
        const {difficulty}=originalBlock;
        if(difficulty<1) return 1;

        const difference = timeStamp-originalBlock.timeStamp;

        if(difference>MINE_RATE){
            return difficulty-1;
        }
        else{
             return difficulty+1;
        }
    }
}

// const b1=new Block('12/12/22D','0x0012c','d0xcc12v','12234141250042340');
// **Passing as a obj to avoid mispositioning ans for better security

// const b1=new Block({
//     timeStamp:"12/12/22",prevHash:"0x123",hash:"d0xcc12v",data:"12234141250042340",
// });
// console.log(b1);


// **calling the genisis block which is created in the config.js 

// const genisisBlock = Block.genisis();
// console.log(genisisBlock);



// **testing mineBlock

// const result = Block.mineBlock({prevBlock: b1,data:"Block2"});
// console.log(result);




module.exports=Block;


