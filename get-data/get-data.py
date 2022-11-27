from google.cloud import bigquery, storage
from dotenv import load_dotenv
from datetime import datetime
import os
import json

load_dotenv('./.env')


def get_big_query_data(project_id, dataset, table):
    client = bigquery.Client.from_service_account_json(
        os.environ.get("SERVICE_ACCOUNT_JSON_PATH"))
    query = f"""
    SELECT * FROM `{project_id}.{dataset}.{table}`
    """
    return client.query(query).to_dataframe()


def write_in_storage_as_csv(bucket_name, destination_file_name, data):
    client = storage.Client.from_service_account_json(
        os.environ.get("SERVICE_ACCOUNT_JSON_PATH"))
    bucket = client.get_bucket(bucket_name)
    blob = bucket.blob(destination_file_name)
    blob.upload_from_string(data.to_csv(), 'text/csv')
    metadata = {
        "lines": data.shape[0],
        "columns": data.shape[1],
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    blob_metadata = bucket.blob(destination_file_name.replace(".csv", ".json"))
    blob_metadata.upload_from_string(json.dumps(metadata), 'application/json')
    print('csv file uploaded in storage')


data = get_big_query_data(
    'emf-teacher', 'trabalho_loans', 'loan_default')

write_in_storage_as_csv(os.environ.get("BUCKET_NAME"), 'data.csv', data)
