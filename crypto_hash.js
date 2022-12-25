const crypto= require('crypto');

// **using spirit operator to take multiple inputes as an arguments (like args and kwargs in python)
//  to generate hash using the sha256 algorithm
const cryptoHash=(...inputs)=>{
     const hash = crypto.createHash('sha256');
    hash.update(inputs.join(''));  //**to avoid different hash incase if inputs are not inorder (from the below E.g)
    //  **we sort thr inputs before generating the hash
     return hash.digest('hex');
}

// **testing our function
// before sorting
result1 = cryptoHash("hello","world");
result2 = cryptoHash("world","hello");
// **after sorting the inuputs before joining

// console.log(result1==result2);

// **exporting the module

module.exports=cryptoHash;


