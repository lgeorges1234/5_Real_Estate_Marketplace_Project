# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

## Install
<br/>
This repository contains Smart Contract code in Solidity (using Truffle) and tests (also using Truffle).

To install, download or clone the repo, then:

`npm install`

`cd eth-contract`

To compile your contract, two pre-setup networks are available:
- "dev" for Ganache UI.
- "development" for Ganache CLI

`truffle --network dev compile` or `truffle --network development compile`
<br/><br/>

## Test
<br/>
Tests for each smart contract are present in /eth-contracts/test/ folder
<br/><br/>

`cd eth-contract`

`truffle --network dev test` or `truffle --network development test`

<br/>

## Dependencies
 <br/>

    Truffle : v5.0.2 (core: 5.0.2)
    Solidity : v0.5.0 (solc-js)
    Node : v16.17.1
    lite-server: 2.4.0
    @truffle/hdwallet-provider: 2.0.15
    openzeppelin-solidity: 2.2.0
    solc: 0.5.2
    solc-js: 0.5.2
<br/>

## Contract address
<br/>

> Because of visibility issues in Opensea, the contract has been deployed on the goerly test network.
<br/>

### Contract address 'SolnSquareVerifier'

0x89Cd8929E82B0CA1D60c87634caA560168637454
<br/>

### ABI

['SolnSquareVerifier' ABI](./doc/SolnSquareVerifierABI.json)
<br/>

### Links

- 'SolnSquareVerifier' contracts's transaction on Etherscan

`https://goerli.etherscan.io/address/0x89Cd8929E82B0CA1D60c87634caA560168637454`

![Etherscan contract](./doc/capture/etherscanCapture_Goerly.PNG "Etherscan contract")

- Contract's collection on Opensea

`https://testnets.opensea.io/fr/collection/unidentified-contract-0zvwnbvb8v`

![Opensea Frontend](./doc/capture/OpenseaFrontendCapture.PNG "Opensea Frontend")

- Sales of two tokens
<br/>

[First sale](./doc/capture/firstSaleCapture.PNG)
<br/>

[Second sale](./doc/capture/secondSaleCapture.PNG)
<br/>

[Third sale](./doc/capture/thirdSaleCapture.PNG)
<br/>

[Fourth sale](./doc/capture/fourthSaleCapture.PNG)
<br/>

[Fifth sale](./doc/capture/fifthSaleCapture.PNG)
<br/>


## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)