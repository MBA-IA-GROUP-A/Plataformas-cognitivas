echo "build federation_model"
docker build -t federation_model .

echo "build r_model"
docker build -t r_model -f R.dockerfile .

echo "build cluster_model"
docker build -t cluster_model --build-arg=APP=cluster_model . 

echo "build modelmanager"
docker build -t modelmanager -f dockerfile.model_manager .

echo "create plat_network"
docker network create plat_network

echo "run federation_model"
docker run -d --network plat_network -p 10001:8080 --restart always --name federation_model federation_model python federation_model/server.py 8080

echo "run r_model"
docker run -d --network plat_network -p 10002:8080 --restart always --name r_model r_model R -e "source('r_model/server.R'); library(plumber); pb <- pr('r_model/plumber.R'); pr_run(port=8080, host='0.0.0.0', pr=pb)"

echo "run cluster_model"
docker run -d --network plat_network -p 10003:8080 --restart always --name cluster_model cluster_model python cluster_model/server.py 8080

echo "generate config"
bash generate_config.sh

echo "run modelmanager"
docker run -d --network plat_network -p 443:8080 --restart always -v $(pwd)/config:/server/config -v $(pwd)/Log:/server/Log --name modelmanager modelmanager python model_manager/server.py