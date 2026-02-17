set -e
cd ./erp/vnet/
./build.sh
cd ../main
./build.sh
cd ../ui
./build.sh
cd ../../logs/agent
./build.sh
cd ../vnet
./build.sh

