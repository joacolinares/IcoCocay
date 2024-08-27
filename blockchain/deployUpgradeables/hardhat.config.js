require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        //enabled: true,
      //  runs: 100,
      },
    //  viaIR: true,
    },
  },
  networks: {
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: ["e2ec0c8ad5bf6f9bb002f6b5fd5446e74c2582b22f06a26c8d8b2d01d6d34308"], // Asegúrate de definir la PRIVATE_KEY en tu .env
    },
  },
  etherscan: {
    apiKey: {
      bsc: 'AABG8TZX1JPB9JJMFFPF42IBYSC6PI1ED8'
    }
  }
};