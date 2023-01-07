import json
import pandas as pd
import numpy as np
from flask import Flask, request
import os
import threading
import cluster_model._train as _train
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

# Define the Flask app
app = Flask(__name__)

# Define a route for the model
@app.route('/predict', methods=['POST'])
def predict(request = request):
  print(request.values)

  try:
    model = joblib.load('tmp/models/kmeans.joblib')

    data = request.get_json()

    # verify data shape matriz 1x51
    if len(data) != 1 or len(data[0]) != 51:
      ret = json.dumps({"error_message": "Expected data shape: 1x51"})
      return app.response_class(response=ret, status=400, mimetype='application/json')

    predictions = model.predict(data)
    # example of prediction format: [1 1 1 ... 0 0 0]

    ret = json.dumps({ 'result': predictions[0] }, cls=NpEncoder)
    return app.response_class(response=ret, status=200, mimetype='application/json')
  except Exception as err:
    ret = json.dumps({"error_message": str(err)})
    return app.response_class(response=ret, status=500, mimetype='application/json')

if __name__ == '__main__':
  if not os.path.exists('tmp/models/kmeans.joblib'):
    _train.main()

  print(f"Server, id: {os.getpid()}, thread: {threading.current_thread().ident}")
  args = sys.argv[1:]
  if len(args) < 1:
      args.append('8080')
  print(args)

  app.run(port=args[0], host='0.0.0.0')
  pass
