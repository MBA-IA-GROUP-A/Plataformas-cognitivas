import pandas as pd
import tensorflow as tf
from tensorflow import keras
from keras import layers
from google.cloud import storage
from dotenv import load_dotenv
import sys
import uuid
import os
from azureml.core.authentication import InteractiveLoginAuthentication
sys.path.append('normalization')
from normalization import NormalizedData
from azureml.core import Workspace, Experiment
import glob

load_dotenv('.env')

# subscription_id = 'b15f68e0-7760-476f-b1d4-45c98a555e2a'
# resource_group = 'FIAP-IA'
# workspace_name = 'grupo-demo-1-vini'

# workspace = Workspace(subscription_id, resource_group, workspace_name)
# workspace = Workspace.from_config()

def norm(x):
  return (x - train_stats['mean']) / train_stats['std']

if __name__ == "__main__":
    normalizedData = NormalizedData()

    dataset = normalizedData.normalize_data()

    target = 'Status'
    EPOCHS = 5

    # experiment = Experiment(workspace=workspace, name="federation_model")
    # run = experiment.start_logging(run_id=str(uuid.uuid1()),
    #                            display_name="Federation Model " + str(uuid.uuid1()),
    #                            outputs="model",
    #                            snapshot_directory="federation-model-data")
    # run.log("Tipo", "Federation Model")

    train_dataset = dataset.sample(frac=0.8,random_state=0)
    test_dataset = dataset.drop(train_dataset.index)

    train_stats = train_dataset.describe()
    train_stats.pop(target)
    train_stats = train_stats.transpose()
    train_stats
    
    train_labels = train_dataset.pop(target)
    test_labels = test_dataset.pop(target)

    normed_train_data = norm(train_dataset)
    normed_test_data = norm(test_dataset)
    
    model = keras.Sequential([
      # layers.Dense(64, activation='relu', input_shape=[len(train_dataset.keys())]),
      # layers.Dense(64, activation='relu'),
      # layers.Dense(1)
      layers.Flatten(input_shape=[len(train_dataset.keys())]),
      layers.Dense(64, activation='relu'),
      layers.Dropout(0.2),
      layers.Dense(10, activation='softmax')
    ])
    # model.compile(loss='sparse_categorical_crossentropy', optimizer="adam", metrics=['mae', 'mse','accuracy'])
    model.compile(loss='mse', optimizer="adam", metrics=['mae', 'mse','accuracy'])

    early_stop = keras.callbacks.EarlyStopping(monitor='val_loss', patience=10)

    # model.fit(normed_train_data, train_labels, epochs=EPOCHS, validation_split = 0.2, verbose=0, callbacks=[early_stop])
    model.fit(normed_train_data, train_labels, epochs=EPOCHS, validation_split = 0.2, callbacks=[early_stop])
                      
    loss, mae, mse, accuracy = model.evaluate(normed_test_data, test_labels, verbose=2)
    print("Testing set Mean Abs Error: {:5.2f} ".format(mae))
    print("Testing set Mean Squared Error: {:5.2f} ".format(mse))
    print("Testing set Accuracy: {:5.2f} ".format(accuracy))
    # run.log("Erro médio do conjunto de teste:", mae)

    model.save('tmp/models/federation_model.h5')

    # run.upload_file(name=name, path_or_stream=f'models/federation_model.h5')
    # run.complete()
    # run.wait_for_completion()

    bucket_name = os.getenv('BUCKET_NAME')
    service_account_json_path = os.getenv('SERVICE_ACCOUNT_JSON_PATH')
    client = storage.Client.from_service_account_json(service_account_json_path)
    bucket = client.get_bucket(bucket_name)

    blob = bucket.blob('federation_model/federation_model.h5')
    blob.upload_from_filename('tmp/models/federation_model.h5')

    # blob = bucket.blob('federation_model/fingerprint.pb')
    # blob.upload_from_filename('tmp/models/federation_model/fingerprint.pb')

    # blob = bucket.blob('federation_model/keras_metadata.pb')
    # blob.upload_from_filename('tmp/models/federation_model/keras_metadata.pb')

    # blob = bucket.blob('federation_model/variables/variables.index')
    # blob.upload_from_filename('tmp/models/federation_model/variables/variables.index')

    # blob = bucket.blob('federation_model/variables/variables.data-00000-of-00001')
    # blob.upload_from_filename('tmp/models/federation_model/variables/variables.data-00000-of-00001')


    print('Modelo salvo com sucesso!')
    pass
