rm -rf demo
mkdir -p demo
cd erp/vnet/
echo "Building vnet"
go build -o ../../demo/vnet_demo
cd ../main
echo "Building ERP"
go build -o ../../demo/erp_demo
cd ../ui
echo "Building ui"
go build -o ../../demo/ui_demo main.go shared.go shared_crm.go shared_fin.go shared_mfg.go shared_other.go shared_prj.go shared_sales.go shared_scm.go
cp -r ./web ../../demo/.
cd ../../demo
./vnet_demo &
sleep 1
./erp_demo &
./ui_demo

pkill demo
cd ..
rm -rf demo
