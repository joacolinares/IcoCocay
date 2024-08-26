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
      accounts: ["1eae322fbddf38508fa5ab74b54836ddbb3169220b9e663123bc56c113e43397"], // Asegúrate de definir la PRIVATE_KEY en tu .env
    },
  },
  etherscan: {
    apiKey: {
      bsc: 'AABG8TZX1JPB9JJMFFPF42IBYSC6PI1ED8'
    }
  }
};