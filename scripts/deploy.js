const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  console.log("Deploying contract with the account:", deployer.address);

  const marketplace = await hre.ethers.deployContract("NFTMarketplace");

  await marketplace.waitForDeployment();

  const marketplaceAddress = await marketplace.getAddress();

  console.log("Marketplace address:", marketplaceAddress);

  const data = {
    address: marketplaceAddress,
    abi: JSON.parse(marketplace.interface.formatJson()),
  };

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync("./src/Marketplace.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
