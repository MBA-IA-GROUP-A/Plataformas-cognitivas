# Trabalho final de plataformas cognitivas

> Versão do python 3.9

## GET DATA

A pasta get-data contem o script de extração de dados do BigQuery e salva no bucket do GCE

### Setup

1. É necessário ter o arquivo `.env` e o `credentials.json` para poder rodar o projeto. Ambos estão no repositório privado de keys.
2. `pip install -r requirements.txt`
3. `python get_data/update_data_on_gce.py`

***

## Normalize

Para gerar os dados normalizados para treino basta executar `python normalization/generated_normalize_csv.py`

***

## VM

Para criar a VM no GCE basta executar `python vm/create_vm.py`. Essa instrução usa o credentials do projeto e o SSH local para fazer copia de arquivos e inicializar os dockers.

***

## Docker

### Buildando apenas o modelo fora do model manager

```bash
docker build -t <container_name> . --build-arg APP=<model_name(federation_model | cluster_model | r_model)> --build-arg PORT=<port>
```

### Servindo um modelo o model manager

```bash
docker run -d --name <model_name(federation_model | cluster_model | r_model)> -e APP=<model_name(federation_model | cluster_model | r_model)> -e PORT=<port> -p <port>:<port> -t <container_name>
```

### Buildando model manager e criando a rede

```bash
docker build -t platserver -f dockerfile.model_manager .
```

```bash
docker network create plat_network
```

### Docker Models na rede do model manager

```bash
docker run -it --name platserver --network plat_network -p 8080:8080 -v $(pwd)/config:/server/config platserver /bin/bash
```

#### Servindo os modelos

```bash
docker run -d --network plat_network -p 1000<number>:8080 --restart always --name <model_name(federation_model | cluster_model | r_model)> platserver python <model_name(federation_model | cluster_model | r_model)>/server.py 8080
```

#### Subindo model manager

```bash
docker run -d --network plat_network -p 443:8080 --restart always -v $(pwd)/config:/server/config -v $(pwd)/Log:/server/Log --name modelmanager platserver python model_manager/server.py 
```

## Front

[Clique aqui para acessar a documentação do front-end](https://github.com/MBA-IA-GROUP-A/Plataformas-cognitivas/front/README.md)
