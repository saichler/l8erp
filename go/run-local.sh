set -e
rm -rf demo
mkdir -p demo
cd logs/agent
echo "Building logs agent"
go build -o ../../demo/log-agent_demo
cd ../vnet
echo "Building logs vnet"
go build -o ../../demo/log-vnet_demo
cd ../../erp/vnet/
echo "Building vnet"
go build -o ../../demo/vnet_demo
cd ../main
echo "Building ERP"
go build -o ../../demo/erp_demo
cd ../ui/main1
echo "Building ui"
go build -o ../../../demo/ui_demo
cd ..
cp -r ./web ../../demo/.
cd ../../demo
./log-vnet_demo &
./vnet_demo &
sleep 1
./log-agent_demo &
./erp_demo &
./ui_demo

pkill demo
cd ..
rm -rf demo
