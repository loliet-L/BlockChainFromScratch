const Block = require('./block');

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
}

// **Testing our BlockChain Class

const blockchain = new BlockChain();
blockchain.addBlock({data:"Block1"});
console.log(blockchain);

module.exports= BlockChain;