
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Transaction");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log("Lock with 1 ETH deployed to:", lock.address);
}


const runMain = async() =>{
  try{
    await main();
    process.exit(0)
  }catch(error){

    console.log(error)
    process.exit(0)
  }

}
runMain();
