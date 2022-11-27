from google.cloud import bigquery, storage
from dotenv import load_dotenv
import os

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
    print('csv file uploaded in storage')


data = get_big_query_data(
    'emf-teacher', 'trabalho_loans', 'loan_default')

write_in_storage_as_csv(os.environ.get("BUCKET_NAME"), 'data.csv', data)
