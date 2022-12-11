import joblib
import pandas as pd
import json
import numpy as np
from flask import Flask, jsonify, request
import os
import threading
from flask import Flask, request
import tensorflow as tf

class NpEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, np.integer):
      return int(obj)
    elif isinstance(obj, np.floating):
      return float(obj)
    elif isinstance(obj, np.ndarray):
      return obj.tolist()
    else:
      return super(NpEncoder, self).default(obj)

# Define the Flask app
app = Flask(__name__)

# Define a route for the model
@app.route('/federation/predict', methods=['POST'])
def predict():
  print(request.values)

  try:
    model = tf.keras.models.load_model('tmp/models/federation_model.h5')

    data = request.get_json()

    # verify data shape matriz 1x51
    if len(data) != 1 or len(data[0]) != 51:
      ret = json.dumps({"error_message": "Expected data shape: 1x51"})
      return app.response_class(response=ret, status=400, mimetype='application/json')

    predictions = model.predict(data)

    ret = json.dumps({ 'result': predictions[0][0] }, cls=NpEncoder)
    return app.response_class(response=ret, status=200, mimetype='application/json')
  except Exception as err:
    ret = json.dumps({"error_message": str(err)})
    return app.response_class(response=ret, status=500, mimetype='application/json')

if __name__ == '__main__':
    print(f"Server, id: {os.getpid()}, thread: {threading.current_thread().ident}")
    app.run(port=8080, host='0.0.0.0')
