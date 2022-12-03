# Trabalho final de plataformas cognitivas

> Versão do python 3.9

## GET DATA

A pasta get-data contem o script de extração de dados do BigQuery e salva no bucket do GCE

### Setup

1. É necessário ter o arquivo `.env` e o `credentials.json` para poder rodar o projeto. Ambos estão no repositório privado de keys.
2. `pip install -r requirements.txt`
3. `python get_data/update_data_on_gce.py`
