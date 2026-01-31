kubectl apply -f ./vnet.yaml
sleep 2
kubectl apply -f ./erp.yaml
kubectl apply -f ./web.yaml
