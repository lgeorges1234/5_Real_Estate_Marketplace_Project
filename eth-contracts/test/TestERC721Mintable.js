var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const account_three = accounts[3];
    const account_four = accounts[4];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            // TODO: mint multiple tokens
            this.contract = await ERC721MintableComplete.new({from: owner});
            await this.contract.mint(account_one, 1, { from: owner });
            await this.contract.mint(account_one, 2, { from: owner });
            await this.contract.mint(account_one, 3, { from: owner });
            await this.contract.mint(account_two, 4, { from: owner });
            await this.contract.mint(account_two, 5, { from: owner });
            await this.contract.mint(account_three, 6, { from: owner });
        })

        it('should return total supply', async function () { 
            const totalSupplyResult = await this.contract.totalSupply.call();
            assert.equal(totalSupplyResult, 6, "totalSupply doesn't return the right number of total token")
        })

        it('should get token balance', async function () { 
            const tokenBalanceResult1 = await this.contract.balanceOf.call(account_one);
            const tokenBalanceResult4 = await this.contract.balanceOf.call(account_four);
            assert.equal(tokenBalanceResult1, 3, "tokenBalance doesn't return the right number of token for account_1");
            assert.equal(tokenBalanceResult4, 0, "tokenBalance doesn't return the right number of token for account_4");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenURIResult = await this.contract.tokenURI(1);
            assert.equal(tokenURIResult, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "tokenURI doesn't return the right URI")
        })

        it('should transfer token from one owner to another', async function () { 
            const transferOwnerShipResult = await this.contract.safeTransferFrom(account_one, account_four, 1, { from: account_one });
            const isNewOwnerResult = await this.contract.ownerOf.call(1);

            assert.equal(transferOwnerShipResult.logs[0].event, "Transfer", "Event Transfer as not been triggered" );
            assert.equal(isNewOwnerResult, account_four, "account_four is not the new owner of tokenId 1");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: owner});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let errorResult;
            try {
                await this.contract.mint(account_one, 7, { from: account_one });
            } catch (error) {
                errorResult = error.message;
            }
            assert.equal(errorResult, "Returned error: VM Exception while processing transaction: revert Caller is not contract owner -- Reason given: Caller is not contract owner.", "Only contractOwner can mint a token")
        });

        it('should return contract owner', async function () { 
            let contractOwnerResult;
            let errorResult;
            try {
                contractOwnerResult = await this.contract.getOwner.call();
            } catch (error) {
                errorResult = error.message;
            } 
            assert.equal(contractOwnerResult, owner, errorResult);
        })

    });
})