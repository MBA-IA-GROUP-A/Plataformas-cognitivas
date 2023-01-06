import json
import pandas as pd
import numpy as np
from flask import Flask, request
import os
import threading
from flask import Flask, request
import tensorflow as tf
import train
import sys

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
@app.route('/predict', methods=['POST'])
def predict(request = request):
  print(request.values)

  try:
    model = tf.keras.models.load_model('tmp/models/federation_model.h5')

    body = request.get_json()
    data = body['data']

    # verify data shape matriz 1x51
    if len(data) != 51:
      ret = json.dumps({"error_message": "Expected data shape: 1x51"})
      return app.response_class(response=ret, status=400, mimetype='application/json')

    predictions = model.predict([data])

    ret = json.dumps({ 'result': predictions[0][0] }, cls=NpEncoder)
    return app.response_class(response=ret, status=200, mimetype='application/json')
  except Exception as err:
    ret = json.dumps({"error_message": str(err)})
    return app.response_class(response=ret, status=500, mimetype='application/json')

if __name__ == '__main__':
  if not os.path.exists('tmp/models/federation_model.h5'):
    train.main()

  print(f"Server, id: {os.getpid()}, thread: {threading.current_thread().ident}")
  args = sys.argv[1:]
  if len(args) < 1:
      args.append('8080')
  print(args)

  app.run(port=args[0], host='0.0.0.0')
  pass
