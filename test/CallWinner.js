const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CallWinner", function () {
    async function deployContracts() {
        const [owner, otherAccount] = await ethers.getSigners();
        const EmitWinner = await ethers.getContractFactory("EmitWinner");
        const emitWinner = await EmitWinner.deploy();
        const CallWinner = await ethers.getContractFactory("CallWinner");
        const callWinner = await CallWinner.deploy();

        return { emitWinner, callWinner, owner, otherAccount };
    }

    it("Should emit Winner event on EmitWinner", async function () {
        const { callWinner, emitWinner } = await loadFixture(deployContracts);
        await expect(callWinner.winner(emitWinner.target)).to.emit(emitWinner, "Winner");
    });
})

