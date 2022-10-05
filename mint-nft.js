
 const infuraKey = "2ad2ac13c92343c6bfe93cff9db8a981";

const Web3 = require('web3');
let web3 = new Web3('https://ropsten.infura.io/v3/KEY');

const contract = require("./eth-contracts/build/contracts/CustomERC721Token.json");
const contractAddress = "0x9704c78b7775e9A31F6599eaaA91Ec2B9963648a";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const privateKey = "";
const publicKey = "";

nftContract.methods.symbol().call().then(console.log);

web3.eth.defaultAccount = publicKey;
console.log(web3.eth.defaultAccount);

async function mint() {
  const nonce = await web3.eth.getTransactionCount(publicKey, 'latest'); //get latest nonce
  console.log(nonce);
  //the transaction
  const tx = {
    'from': publicKey,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mint("0x7Fd8AD419dbDe17cD6673c03Eb7D671cE125C955", 1).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

mint();



