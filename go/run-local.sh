rm -rf demo
mkdir -p demo
cd erp/vnet/
echo "Building vnet"
go build -o ../../demo/vnet_demo
cd ../hcm
echo "Building HCM"
go build -o ../../demo/hcm_demo
cd ../fin
go build -o ../../demo/fin_demo
cd ../ui
echo "Building ui"
go build -o ../../demo/ui_demo
cp -r ./web ../../demo/.
cd ../../demo
./vnet_demo &
sleep 1
./hcm_demo &
./fin_demo &
./ui_demo

pkill demo
cd ..
rm -rf demo
