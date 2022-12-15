import pandas as pd
import sys
import joblib
import os
sys.path.append('normalization')
from normalization import NormalizedData
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from google.cloud import storage

if __name__ == "__main__":
    ms = MinMaxScaler()
    normalized_data = NormalizedData()
    dataset = normalized_data.normalize_data()
    
    target = dataset['Status']

    dataset.drop(['Status'], axis=1, inplace=True)

    X = dataset
    cols = X.columns
    X = ms.fit_transform(X)
    X = pd.DataFrame(X, columns=[cols])
    
    kmeans = KMeans(n_clusters=2, random_state=42)
    kmeans.fit(X)
    labels = kmeans.labels_
    correct_labels = sum(target == labels)
    print("Result: %d out of %d samples were correctly labeled." % (correct_labels, target.size))
    print('Accuracy score: {0:0.2f}'. format(correct_labels/float(target.size)))

    model_name = 'kmeans.joblib'
    dir = 'tmp/models/cluster_model/'

    if not os.path.isdir(dir):
        os.makedirs(dir)
    joblib.dump(kmeans, filename=f'tmp/models/cluster_model/{model_name}')

    bucket_name = os.getenv('BUCKET_NAME')
    service_account_json_path = os.getenv('SERVICE_ACCOUNT_JSON_PATH')
    client = storage.Client.from_service_account_json(service_account_json_path)
    bucket = client.get_bucket(bucket_name)

    blob = bucket.blob(f'cluster_model/{model_name}')
    blob.upload_from_filename(f'tmp/models/cluster_model/{model_name}')

    print('Modelo salvo com sucesso!')
    pass