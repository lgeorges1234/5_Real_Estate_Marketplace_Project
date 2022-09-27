pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {

// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address _address;
    }

// TODO define an array of the above struct
    Solution[] solutionArray;

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutionMap;

// TODO Create an event to emit when a solution is added
    event newSolution(address _address, uint256 _index);

// TODO Create a function to add the solutions to the array and emit the event
    function solutionCreated(bytes32 solutionHash, address _address, uint256 _index) public
        {
            // Add solution elements to mapping of solutions with solver(solution) as key
            solutionMap[solutionHash]._address = _address;
            solutionMap[solutionHash].index = _index;
            // Push solution to array
            solutionArray.push(solutionMap[solutionHash]);
            // Emit new solution event
            emit newSolution(_address, _index);
        }

// TODO Create a function to mint new NFT only after the solution has been verified
    function mintNewNFT(
        address _address, 
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory d
        ) 
        public 
        {
            // Generate hash from solution data to use as key in solutionMap
            bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, d));
            //  - make sure the solution is unique (has not been used before)
            require(solutionMap[solutionHash]._address == address(0), "This solution already exists.");
            //  - make sure you handle metadata as well as tokenSuplly
            solutionCreated(solutionHash, _address, tokenId);
            super.mint(_address, tokenId);
        }
}