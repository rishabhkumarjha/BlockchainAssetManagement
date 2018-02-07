

# Installation
1. Clone this repository and extract it to a folder lets call it BlockchainAssetManagement
2. cd to asset
3. Initialize geth "geth --datadir blockchain/ init blockchain/genesis.json"
4. Start geth 
geth --datadir <datadir> init <genesis_file> the genesis file must have chain_id = 1 to match with network_id in following command
geth --port 3000 --networkid 1 --datadir blk/ --maxpeers=5 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3"
5. open a new terminal and cd to BlockchainAssetManagement
  geth attach blockchain/geth.ipc
  this is where we will type all the commands
  * personal.newAccount()  it is advised that you set a passphrase
  * miner.start(1)
  * eth.defaultAccount = eth.coinbase
  * personal.unlockAccount(eth.coinbase)
6. Start a new terminal and cd to BlockchainAssetManagement
   npm install -g truffle
7. truffle compile
8. truffle migrate
9. npm run dev
  
# troubleshoot
  if you do not have enough ether to buy a property transfer some to the account in your metamask from geth command
  "eth.sendTransaction({"from":eth.coinbase,"to":<metamask account no.>,"value":10000000000000000})

# start

follow petshop tutorial to the end

# geth
geth --datadir <datadir> init <genesis_file> the genesis file must have chain_id = 1 to match with network_id in following command
geth --port 3000 --networkid 1 --datadir blk/ --maxpeers=5 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3"

# truffle
truffle compile
geth console> unlock, eth.defaultAccount = eth.coinbase, reduce gas limit in truffle.js if exceeds block gas limit
truffle migrate
npm run dev

## thats all
