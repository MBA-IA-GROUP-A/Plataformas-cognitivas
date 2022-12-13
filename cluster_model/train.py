import pandas as pd
import sys
import joblib
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
    print("Result: %d out of %d samples were correctly labeled." % (correct_labels, target.size))
    print('Accuracy score: {0:0.2f}'. format(correct_labels/float(target.size)))

    # joblib.dump(kmeans, "tmp/models/cluster_model")


