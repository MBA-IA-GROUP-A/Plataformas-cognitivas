import json
import pandas as pd
import numpy as np
import subprocess
from flask import Flask, request
import os
import threading
import sys
import joblib

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

def get_cluster_label(cluster_number):
  dict = {
    0: 'High income',
    1: 'Low income',
    2: 'Very High income',
    3: 'Average income',
  }
  return dict[int(cluster_number)]

# Define the Flask app
app = Flask(__name__)

# Define a route for the model
@app.route('/predict', methods=['POST'])
def predict(request = request):
  print(request.values)

  try:
    model = joblib.load('tmp/models/kmeans.joblib')

    body = request.get_json()
    data = body['data']

    # verify data shape matriz 1x51
    if len(data) != 51:
      ret = json.dumps({"error_message": "Expected data shape: 51"})
      return app.response_class(response=ret, status=400, mimetype='application/json')

    predictions = model.predict([data])
    fraud_propensity = None
    with open('tmp/models/fraud_propensity.json') as f:
      fraud_propensity = json.load(f)

    ret = json.dumps({ 'result': {
      'cluster': predictions[0],
      'cluster_name': get_cluster_label(predictions[0]),
      'fraud_propensity': fraud_propensity[int(predictions[0])]
    } }, cls=NpEncoder)
    return app.response_class(response=ret, status=200, mimetype='application/json')
  except Exception as err:
    ret = json.dumps({"error_message": str(err)})
    return app.response_class(response=ret, status=500, mimetype='application/json')

if __name__ == '__main__':
  pathToFederationModel = 'tmp/models/kmeans.joblib'
  if (os.path.exists(pathToFederationModel) == False):
    print('Cluster Model not found, train a new model...')
    subprocess.run(["python", "cluster_model/train.py"])

  print(f"Server, id: {os.getpid()}, thread: {threading.current_thread().ident}")
  args = sys.argv[1:]
  if len(args) < 1:
      args.append('8080')
  print(args)

  app.run(port=args[0], host='0.0.0.0')
  pass
