from flask import Flask, render_template, request
from flask_cors import CORS

import joblib
from model1 import get_recipe_recommendations
from model1 import searchRecipe

app = Flask(__name__, template_folder='templates')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load the model
model = joblib.load('model1.joblib')

from flask import jsonify



@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    # Get the user input from the request body
    data = request.get_json()
    ingredients = data['ingredients']

    # Get recipe recommendations based on the user input
    recommendations = get_recipe_recommendations(ingredients)

    # Return the recommendations as a JSON response
    return jsonify(recommendations)


# for recipe suggestion
@app.route('/api/recipe', methods=['POST'])
def recipe_recommend():
    # Get the user input from the request body
    recipe_name = request.get_data()
    # ingredients = recipe_name['ingredients']
    

    # Get recipe recommendations based on the user input
    recipe_recommendation = searchRecipe(recipe_name)

    # Return the recommendations as a JSON response
    # print(recipe_recommendation)
    return jsonify(recipe_recommendation)



if __name__ == '__main__':
    app.run(debug=True)
