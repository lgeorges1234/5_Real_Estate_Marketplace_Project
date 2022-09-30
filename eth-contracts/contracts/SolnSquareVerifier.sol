pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./Verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is SquareVerifier, CustomERC721Token {

// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 _index;
        bytes32 key;
        address _address;
        bool verified;
    }

    // struct Proof {
    //   uint[2] a;
    //   uint[2] b;
    //   uint[2] c;
    // }

// TODO define an array of the above struct
    Solution[] solutionArray;

// TODO define a mapping to store unique solutions submitted
    mapping(uint256 => Solution) private solutionMapping;

// TODO Create an event to emit when a solution is added
    event newSolutionAdded(address _address,uint256 _tokenId, bytes32 _key);

// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        address sender,
        uint256 tokenId,
        Proof memory proof,
        uint[2] memory a,
        uint[2] [2] memory b, 
        uint[2] memory c, 
        uint[1] memory input
        ) 
        public
        {
          // check for valid solution
          require(Verifier.verifyTx(proof, input), "Proof is incorrect");
          // create a unique key
          bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
          // check if the solution is unique
          require(!solutionMapping[tokenId].verified, "Solution already exists");
          // reccord the solution in the solution array
          uint256 index = solutionArray.length;
          Solution memory solution = Solution(index, key, sender, true);
          solutionArray.push(solution);
          // Map the solution in the solution mapping
          solutionMapping[tokenId] = solution;
          // emit according event
          emit newSolutionAdded(sender, tokenId, key);
        }

// TODO Create a function to mint new NFT only after the solution has been verified
    function mintNewNFT(address to, uint256 tokenId) 
        public 
        {
            //  - make sure the solution is unique (has not been used before)
            require(!solutionMapping[tokenId].verified, "Solution already exists");
            //  - make sure you handle metadata as well as tokenSuplly
            super.mint(to, tokenId);
        }
}