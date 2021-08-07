require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require('@openzeppelin/hardhat-upgrades')
// require("hardhat-gas-reporter");
require('hardhat-log-remover');

const INFURA_PROJECT_ID = "";

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
console.log(mnemonic)

module.exports = {
    solidity: {
        compilers: [
            {version: "0.8.4",  settings: {optimizer: {enabled: true, runs: 200}}},
            {version: "0.7.6",  settings: {optimizer: {enabled: true, runs: 200}}},
            {version: "0.6.6",  settings: {optimizer: {enabled: true, runs: 200}}},
            {version: "0.5.16", settings: {optimizer: {enabled: true, runs: 200}}},
            {version: "0.4.17", settings: {optimizer: {enabled: true, runs: 200}}}
        ]
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: false,
        disambiguatePaths: false
    },
    networks: {
        hardhat: {
          forking: {
            url: "https://data-seed-prebsc-2-s1.binance.org:8545"
          },
          accounts: {mnemonic: mnemonic},
          allowUnlimitedContractSize: true
        },
        ethereum: {
            url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: {mnemonic: mnemonic}
        },
        bsc: {
            url: 'https://bsc-dataseed.binance.org/',
            accounts: {mnemonic: mnemonic}
        },
        heco: {
            url: 'https://http-mainnet.hecochain.com',
            accounts: {mnemonic: mnemonic}
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: {mnemonic: mnemonic}
        },
        kovan: {
            url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: {mnemonic: mnemonic}
        },
        bsctestnet: {
            url: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
            accounts: {mnemonic: mnemonic},
        },
        hecotestnet: {
            url: 'https://http-testnet.hecochain.com',
            accounts: {mnemonic: mnemonic}
        },
        mumbai: {
            // url: 'https://rpc-mumbai.maticvigil.com',
            url: 'https://rpc-mumbai.matic.today',
            accounts: {mnemonic: mnemonic}
        }
    },
    etherscan: {
        // apiKey: '' // Ethereum
        // apiKey: '' // BSC
        // apiKey: '' // HECO
    },
    mocha: {
    timeout: 2000000
  },
};
