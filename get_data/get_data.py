from google.cloud import bigquery, storage
from dotenv import load_dotenv
from datetime import datetime
import os
import json

load_dotenv('.env')


class GetData:
    def __init__(self):
        self.service_account_json_path = os.environ.get(
            "SERVICE_ACCOUNT_JSON_PATH")
        self.bucket_name = os.environ.get("BUCKET_NAME")

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
        blob.upload_from_string(data.to_csv(), 'text/csv')
        metadata = {
            "lines": data.shape[0],
            "columns": data.shape[1],
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        blob_metadata = bucket.blob(
            destination_file_name.replace(".csv", ".json"))
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
