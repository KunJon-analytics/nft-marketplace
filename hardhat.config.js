require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("mint", "Mints TOJU to an account").setAction(async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
      accounts: [`${process.env.REACT_APP_PRIVATE_KEY}`],
      url: process.env.REACT_APP_ALCHEMY_API_URL,
    },
  },
};
