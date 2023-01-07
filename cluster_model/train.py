import pandas as pd
import sys
import joblib
import os
sys.path.append('normalization')
from normalization import NormalizedData
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler

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

    pred = kmeans.predict(X)
    print(pred)
    
    print(
        f"Result: {correct_labels} out of {target.size} samples were correctly labeled.")
    print(f"Accuracy score: {correct_labels/float(target.size)}")

    model_name = 'kmeans.joblib'
    dir = 'tmp/models'

    if not os.path.isdir(dir):
        os.makedirs(dir)
    joblib.dump(kmeans, filename=f'tmp/models/{model_name}')
