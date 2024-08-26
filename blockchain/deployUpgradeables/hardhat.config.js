require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
  networks: {
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: ["1710ebb1b298581e3f5e53ffb390975ccd37dc47c9664ec25c607c26ccbfa3bb"], // Asegúrate de definir la PRIVATE_KEY en tu .env
    },
  },
  etherscan: {
    apiKey: {
      bsc: 'AABG8TZX1JPB9JJMFFPF42IBYSC6PI1ED8'
    }
  }
};