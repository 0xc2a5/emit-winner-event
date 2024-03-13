// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const emitWinner = await hre.ethers.deployContract("EmitWinner");
  await emitWinner.waitForDeployment();
  console.log("Deploy EmitWinner");

  const callWinner = await hre.ethers.deployContract("CallWinner");
  await callWinner.waitForDeployment();
  console.log("Deploy CallWinner");

  await callWinner.winner(emitWinner.target);
  console.log("emit winner event");

  console.log("EmitWinner", emitWinner.target);
  console.log("CallWinner", callWinner.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deploy.js --network sepolia
// EmitWinner 0x5d62b8D6e87Fa2cB8AE25b56DDF1045B51d9f14F
// CallWinner 0x91dE5DA5530C16b20399889EA62548cf039A9aa8
// https://sepolia.etherscan.io/address/0x5d62b8D6e87Fa2cB8AE25b56DDF1045B51d9f14F#events
