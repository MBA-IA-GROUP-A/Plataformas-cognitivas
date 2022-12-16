from google.cloud import bigquery, storage
from dotenv import load_dotenv
from datetime import datetime
import os
import json

load_dotenv('.env')

class GetData():
    def __init__(self):
        self.service_account_json_path = os.getenv('SERVICE_ACCOUNT_JSON_PATH')
        self.bucket_name = os.getenv('BUCKET_NAME')
        if not os.path.exists('tmp'):
            os.makedirs('tmp')

    def get_big_query_data(self, project_id, dataset, table):
        client = bigquery.Client.from_service_account_json(
            self.service_account_json_path)
        query = f"""
        SELECT * FROM `{project_id}.{dataset}.{table}`
        """
        print('Data get with success')
        return client.query(query).to_dataframe()

    def write_in_storage_as_csv(self, destination_file_name, data, bucket_name=None):
        if bucket_name is None:
            bucket_name = self.bucket_name
        client = storage.Client.from_service_account_json(
            self.service_account_json_path)
        bucket = client.get_bucket(bucket_name)
        blob = bucket.blob(destination_file_name)
        blob.upload_from_string(data.to_csv(index=False), 'text/csv')
        metadata = {
            "lines": data.shape[0],
            "columns": data.shape[1],
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        blob_metadata = bucket.blob(
            destination_file_name.split('.')[0] + '.json')
        blob_metadata.upload_from_string(
            json.dumps(metadata), 'application/json')
        print('Csv file uploaded in storage')

    def get_url_file(self, destination_file_name, bucket_name=None):
        if bucket_name is None:
            bucket_name = self.bucket_name
        client = storage.Client.from_service_account_json(
            self.service_account_json_path)
        bucket = client.get_bucket(bucket_name)
        blob = bucket.blob(destination_file_name)
        print('File url: ', blob.public_url)
        return blob.public_url

    def get_file(self, destination_file_name, bucket_name=None):
        if bucket_name is None:
            bucket_name = self.bucket_name
        client = storage.Client.from_service_account_json(
            self.service_account_json_path)
        bucket = client.get_bucket(bucket_name)
        blob = bucket.blob(destination_file_name)
        print('File get with success')
        return blob.download_as_string()

    def get_to_temp_folder(self, destination_file_name, destination_folder = '', bucket_name=None):
        if bucket_name is None:
            bucket_name = self.bucket_name
        client = storage.Client.from_service_account_json(
            self.service_account_json_path)
        bucket = client.get_bucket(bucket_name)
        blob = bucket.blob(destination_file_name)
        path = 'tmp/data'
        if destination_folder and not os.path.exists(f'{path}/{destination_folder}'):
            os.makedirs(f'{path}/{destination_folder}')
            path = f'{path}/{destination_folder}'
        blob.download_to_filename(f'{path}/{destination_file_name}')
        print(f'{path}/{destination_file_name}')
        print('File downloaded with success')
        return f'{path}/{destination_file_name}'
