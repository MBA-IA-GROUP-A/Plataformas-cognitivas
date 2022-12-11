import tensorflow as tf
from dotenv import load_dotenv

load_dotenv('.env')

if __name__ == "__main__":
  model = tf.keras.models.load_model('tmp/models/federation_model.h5')
  data = [[1.0,0.0,0,0,1,206500,3.99,2596.45,360.0,0.0,0,1,418000.0,0,1,1,4980.0,552,1,1.0,75.13586957,1,39.0,1,0,0,0,1,0,1.0,0.0,0.0,0.0,1,0,0,1,0,0,0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,1,0,0,0]]
  print(data)
  predictions = model.predict(data)
  print(predictions)
  pass

