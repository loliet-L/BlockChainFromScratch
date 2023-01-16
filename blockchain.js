const Block = require('./block');
const cryptoHash = require('./crypto_hash');

class BlockChain{
    constructor()
    {
        this.chain=[Block.genisis()];
    }
    addBlock({data})
    {
        const newBlock = Block.mineBlock({
            data,
            prevBlock:this.chain[this.chain.length-1],
        });
        this.chain.push(newBlock); 
   }
//    ** VALIDATING THE CHAIN AFTER MINING
   static isValidChain(chain){
    // JSON.stringfy() is use cuz the obj are of different instances
    // so we cannot compare them directly hence we convert them into strings and then check
    if(JSON.stringify(chain[0])!==JSON.stringify(Block.genisis()))
    {
        return false;
    }
    for(let i=1;i<chain.length;i++)
    {
        const{timeStamp,data,prevHash,hash,nonce,difficulty}=chain[i];
        const realPrevHash=chain[i-1].hash;
        const lastDifficulty=chain[i-1].difficulty;
        if(prevHash!==realPrevHash) return false;
        //  Validating the block hash  
        const ValidateHash= cryptoHash(timeStamp,data,prevHash,nonce,difficulty);
        if(hash!==ValidateHash) return false;
        if(Math.abs(lastDifficulty-difficulty)>1)return false;
    }
    return true;
   }

//    FOR SELECTING THE LONGEST CHAIN FROM THE  MINERS
   replaceChain(chain)
   {
    if(chain.length<=this.chain.length)
    {
        console.error("This is not the logest chain");
        return;
    }
    if(!BlockChain.isValidChain(chain))
    {
        console.error("The chain is InValid !");
        return;
    }
    this.chain=chain;
   }
}

// **Testing our BlockChain Class

// const blockchain = new BlockChain();
// blockchain.addBlock({data:"Block1"});
// blockchain.addBlock({data:"Block2"});
// const result = BlockChain.isValidChain(blockchain.chain);
// console.log(result);
// console.log(blockchain);

module.exports= BlockChain;