const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

let mnemonic;

try {
  mnemonic = fs.readFileSync(".secret").toString().trim();
} catch {
  mnemonic = ''
  console.log('No mnemonic found');
}

module.exports = {
  contracts_build_directory: './truffleBuild',
  networks: {
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: 5777
    },
    rskTestnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co', 0, 1, true, "m/44'/37310'/0'/0/"),
      network_id: 31,
      gasPrice: 60000000
    },
    rskMainnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co', 0, 1, true, "m/44'/137'/0'/0/"),
      network_id: 30,
      gasPrice: 60000000
    }
  }
};
