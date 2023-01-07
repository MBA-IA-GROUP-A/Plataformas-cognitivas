import pandas as pd
import sys
import joblib
import os
sys.path.append('normalization')
from normalization import NormalizedData
from sklearn.cluster import KMeans

if __name__ == "__main__":
  normalized_data = NormalizedData()
  dataset = pd.DataFrame(normalized_data.normalize_data())

  X = dataset.drop(['Status'], axis=1)
  kmeans = KMeans(n_clusters=4)
  kmeans.fit(X)
  labels = kmeans.labels_
  print(labels)
  dataset['cluster'] = kmeans.predict(X)
  
  model_name = 'kmeans.joblib'
  dir = 'tmp/models'

  grouped = dataset.groupby('cluster')
  # save percentage of frauds in each cluster in a json file
  fraud_propensity = grouped['Status'].mean()
  fraud_propensity.to_json('tmp/models/fraud_propensity.json', orient='records')

  if not os.path.isdir(dir):
    os.makedirs(dir)

  joblib.dump(kmeans, filename=f'tmp/models/{model_name}')
