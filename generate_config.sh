
echo '{                                                     ' >  config/microservices.json
echo '  "models": {                                         ' >> config/microservices.json
echo '    "federation_model": {                                     ' >> config/microservices.json
echo '      "version": "V01",                               ' >> config/microservices.json
echo '      "url": "http://'$(sudo docker inspect federation_model | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['NetworkSettings']['Networks']
['plat_network']['IPAddress'])")':8080/predict"          ' >> config/microservices.json
echo '    },                                                ' >> config/microservices.json
echo '    "cluster_model": {                                     ' >> config/microservices.json
echo '      "version": "V01",                               ' >> config/microservices.json
echo '      "url": "http://'$(sudo docker inspect cluster_model | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['NetworkSettings']['Networks']
['plat_network']['IPAddress'])")':8080/predict"          ' >> config/microservices.json
echo '    },                                                ' >> config/microservices.json
echo '    "r_model": {                                     ' >> config/microservices.json
echo '      "version": "V01",                               ' >> config/microservices.json
echo '      "url": "http://'$(sudo docker inspect r_model | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['NetworkSettings']['Networks']
['plat_network']['IPAddress'])")':8080/predict"          ' >> config/microservices.json
echo '    }                                                 ' >> config/microservices.json
echo '  }                                                   ' >> config/microservices.json
echo '}                                                     ' >> config/microservices.json

echo "Arquivo de configuração atualizado com sucesso. Veja seu conteúdo: "

cat config/microservices.json