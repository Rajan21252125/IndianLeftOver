from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from model1 import get_recipe_recommendations, searchRecipe

app = Flask(__name__, template_folder='templates')

# Restrict CORS to only API endpoints
CORS(app, resources={r"/api/*": {"origins": "https://indian-left-over.vercel.app"}})

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    data = request.get_json(silent=True)
    if not data or 'ingredients' not in data:
        return jsonify({"error": "Invalid input"}), 400

    ingredients = data['ingredients']
    recommendations = get_recipe_recommendations(ingredients)
    
    return jsonify(recommendations)

@app.route('/api/recipe', methods=['POST'])
def recipe_recommend():
    data = request.get_json(silent=True)
    if not data or 'recipe_name' not in data:
        return jsonify({"error": "Invalid input"}), 400

    recipe_name = data['recipe_name']
    recipe_recommendation = searchRecipe(recipe_name)
    
    return jsonify(recipe_recommendation)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)  # Enables multi-threading
