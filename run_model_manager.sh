echo "build federation_model"
docker build -t federation_model .

echo "build model_manager"
docker build -t platserver -f dockerfile.model_manager .

echo "create plat_network"
docker network create plat_network

echo "run federation_model"
docker run -d --network plat_network -p 10001:8080 --restart always --name federation_model platserver python federation_model/server.py 8080

echo "generate config"
bash generate_config.sh

echo "run platserver"
docker run -d --name platserver --network plat_network -p 8080:8080 -v $(pwd)/config:/server/config platserver /bin/bash

echo "run modelmanager"
docker run -d --network plat_network -p 443:8080 --restart always -v $(pwd)/config:/server/config -v $(pwd)/Log:/server/Log --name modelmanager platserver python model_manager/server.py