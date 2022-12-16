import tensorflow as tf
from dotenv import load_dotenv

load_dotenv('.env')

if __name__ == "__main__":
  model = tf.keras.models.load_model('tmp/models/federation_model.h5')
  
  ## Example of data to be sent to the model with return Status 1
  # data = [[1.0,0.0,0,0,1,206500,3.99,2596.45,360.0,0.0,0,1,418000.0,0,1,1,4980.0,552,1,1.0,75.13586957,1,39.0,1,0,0,0,1,0,1.0,0.0,0.0,0.0,1,0,0,1,0,0,0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,1,0,0,0]]

  ## Example of data to be sent to the model with return Status 0
  data = [[1.0,0.0,1,0,0,56500,4.75,2420.0,360.0,0.0,0,0,128000.0,0,1,1,7140.0,617,0,0.0,44140625,1,42.0,1,0,0,1,0,0,1.0,0.0,0.0,0.0,0,1,0,0,0,0,1,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1,0,0,0]]

  print(data)
  predictions = model.predict(data)
  print(predictions)
  pass

