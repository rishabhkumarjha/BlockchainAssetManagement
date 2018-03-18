geth --port 3000 --networkid 1 --datadir blockchain/ --maxpeers=5 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3" --mine &
dire=$(pwd)
echo "$dire"


gnome-terminal -e $dire/truffle.sh

