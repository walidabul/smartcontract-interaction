const Web3 = require('web3');
const rpcURL = 'https://bsc-dataseed.binance.org/';
let networkId = 56;
let account = '<ACCOUNT-ADDRESS>';
let privateKey = '<ACCOUNT-PRIVATE-KEY>';
let contractAbi = []; //abi object of smart contract
let contractAddress = '';//contract address
async function contractInteraction(){
    try{
        let contractObject = new web3.eth.Contract(contractAbi, contractAddress);
        // here balanceOf() is a method written in the smart contract, any public readonly method can be called using call()
        let balance = await contractObject.methods.balanceOf(account).call();

        //method that modify data and needs signature, sample contract has a method transferValue with argument value
        let balTrans = contractObject.methods.transferValue(20);
        let txData = {
            from:account,
            data: balTrans.encodeABI(),
            gas: web3.utils.toHex(200000)
        };
        let txSigned = await web3.eth.accounts.signTransaction(
            txData,
            privateKey
        );
        let txReceipt = await web3.eth.sendSignedTransaction(
            txSigned.rawTransaction
        );
    }catch(e){
        console.log(e);
    }
}