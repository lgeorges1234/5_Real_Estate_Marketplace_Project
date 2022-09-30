const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require("../../zokrates/code/square/proof.json");

contract('SolnSquareVerifier', accounts => {
    describe('Test SolnSquareVerifier', function() {
        beforeEach(async function() {
            this.contract = await SolnSquareVerifier.new();
        });
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should add a new solution', async function() {
            let addSolutionResult = await this.contract.addSolution(accounts[1], 1, proof.proof, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
            assert.equal(addSolutionResult.logs[0].event, 'newSolutionAdded', "Event newSolutionAdded has not been emitted");
        });
        it('should revert if a solution already exists', async function() {
            let errorMessage;
            await this.contract.addSolution(accounts[1], 1, proof.proof, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
            try {
                await this.contract.addSolution(accounts[1], 1, proof.proof, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
            } catch(error) {
                errorMessage = error.message;
            }
            assert.equal(errorMessage, 'Returned error: VM Exception while processing transaction: revert Solution already exists -- Reason given: Solution already exists.', "A solution already added should revert");
        })
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint a token', async function() {
            let mintResult = await this.contract.mintNewNFT(accounts[1], 1, proof.proof, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
            assert.equal(mintResult.logs[0].event, 'newSolutionAdded', "Event newSolutionAdded has not been emitted");
            assert.equal(mintResult.logs[1].event, 'Transfer', "Event newSolutionAdded has not been emitted");
        })
        it('should revert to mint a token if a solution already exists', async function() {
            let errorMessage;
            await this.contract.addSolution(accounts[1], 1, proof.proof, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
            try {
                await this.contract.mintNewNFT(accounts[1], 1, proof.proof, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
            } catch(error) {
                errorMessage = error.message;
            }
            assert.equal(errorMessage, 'Returned error: VM Exception while processing transaction: revert Solution already exists -- Reason given: Solution already exists.', "A solution already added should revert");
        })
    })
})



