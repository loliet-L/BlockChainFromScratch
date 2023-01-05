const Blockchain =require("./blockchain");
const blockchain = new Blockchain();

blockchain.addBlock({data:"new Data"});

let prevTimeStamp,nextTimeStamp,nextBlock,timeDiff,AvgTime;

const time=[];

for(let i=0;i<1000;i++)
{
    prevTimeStamp=blockchain.chain[blockchain.chain.length-1].timeStamp;

    blockchain.addBlock({data:`block ${i}`});
    nextBlock=blockchain.chain[blockchain.chain.length-1];
    nextTimeStamp=nextBlock.timeStamp;

    timeDiff=nextTimeStamp-prevTimeStamp;

    time.push(timeDiff);
    AvgTime= time.reduce((total,num)=> total+num)/time.length;
    

    console.log(
        `Time to mineBlock ${timeDiff}ms  , Difficulty : ${nextBlock.difficulty} , Average Time : ${AvgTime}ms`
    );
}