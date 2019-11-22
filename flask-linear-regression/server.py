import numpy as np
from flask import Flask, request, json, jsonify
from flask_cors import CORS
import pickle

app = Flask (__name__)
CORS (app)

model = pickle.load (open ("model.pkl", "rb"))

@app.route ("/api/app/<data1>", methods=["GET"])
def predict (data1):

  print (request.method)

  if (request.method == "POST"):
    data = request.get_json (force=True)
    print (data)
    response = data
    return (response)

  elif (request.method == "GET"):
    print ("data1: {}, {}".format (json.loads(data1)[0], data1[1]))
    data = np.array ([1.4, 1.7]).reshape (-1, 1)
    prediction = {
      "y_pred": model.predict (data).tolist (),
    }

    response = jsonify ({
      "data": prediction
    })
    return (response)

if (__name__ == "__main__"):
  app.run (port=5000, debug=True)