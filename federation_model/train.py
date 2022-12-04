import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sb
import tensorflow as tf
from tensorflow import keras
from keras import layers
import sys
sys.path.append('normalization')
from normalization import NormalizedData

def norm(x):
  return (x - train_stats['mean']) / train_stats['std']

def build_model():
  model = keras.Sequential([
    layers.Dense(64, activation='relu', input_shape=[len(train_dataset.keys())]),
    layers.Dense(64, activation='relu'),
    layers.Dense(1)
  ])
  # optimizer = tf.keras.optimizers.RMSprop(0.001)
  model.compile(loss='mse', optimizer="adam", metrics=['mae', 'mse'])
  return model

class PrintDot(keras.callbacks.Callback):
  def on_epoch_end(self, epoch, logs):
    if epoch % 100 == 0: print('')
    print('.', end='')

if __name__ == "__main__":
    normalizedData = NormalizedData()

    dataset = normalizedData.normalize_data()

    target = 'Status'
    EPOCHS = 10

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
    
    model = build_model()

    early_stop = keras.callbacks.EarlyStopping(monitor='val_loss', patience=10)

    model.fit(normed_train_data, train_labels, epochs=EPOCHS, validation_split = 0.2, verbose=0, callbacks=[early_stop, PrintDot()])
                      
    loss, mae, mse = model.evaluate(normed_test_data, test_labels, verbose=2)
    print("Testing set Mean Abs Error: {:5.2f} MPG".format(mae))
  
    model.save('models/federation_model')
    pass
