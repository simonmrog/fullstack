from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask (__name__)
CORS (app)

@app.route('/')
def index ():
    return (render_template ('index.html'))

@app.route ("/api/hello")
def hello ():
  response = "Hello World"
  return (
    jsonify ({
      "data": response
    })
  )

if (__name__ == "__main__"):
  app.run (host="0.0.0.0", port=5000);