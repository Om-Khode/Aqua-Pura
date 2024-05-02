from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

import joblib  # Assuming you used joblib for saving the model

# Replace 'model.pkl' with your actual model filename
loaded_model = joblib.load('rf_model.pkl')

@app.route("/")
@cross_origin()
def helloWorld():
  return "Hello World!"

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
  # Get data from the request body
  data = request.json

  preprocessed_data = [data[key] for key in data.keys()]

  # Make prediction
  prediction = loaded_model.predict([preprocessed_data])

  # Process prediction results (e.g., handle errors)
  prediction_result = prediction[0]  # Assuming the model returns a single value

  # Return JSON response
  return jsonify({'prediction': prediction_result})

if __name__ == '__main__':
  app.run(port = "8000")
