# Trabalho final de plataformas cognitivas

> Versão do python 3.9

## GET DATA

A pasta get-data contem o script de extração de dados do BigQuery e salva no bucket do GCE

### Setup

1. É necessário ter o arquivo `.env` e o `credentials.json` para poder rodar o projeto. Ambos estão no repositório privado de keys.
2. `pip install -r requirements.txt`
3. `python get_data/update_data_on_gce.py`

## Normalize

Para gerar os dados normalizados para treino basta executar `python normalization/generated_normalize_csv.py`

## Docker Models

```bash
docker build -t <container_name> . --build-arg APP=<model_name(federation_model | cluster_model | classification_model)> PORT=<port>
```

```bash
docker run -e APP=<model_name(federation_model | cluster_model | classification_model)> -p <port>:<port> -t <container_name>
```
