kubectl apply -f ./vnet.yaml
kubectl apply -f ./logs.yaml
sleep 2
kubectl apply -f ./erp.yaml
kubectl apply -f ./web.yaml
kubectl apply -f ./log-agent.yaml
