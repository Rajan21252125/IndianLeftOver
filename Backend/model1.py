import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Read CSV efficiently by selecting only required columns & optimizing data types
dtype_dict = {'TranslatedRecipeName': 'category', 'TranslatedInstructions': 'str', 'URL': 'str', 'image-url': 'str', 'Cuisine': 'category'}
data = pd.read_csv("final.csv", usecols=['TranslatedRecipeName', 'TranslatedInstructions', 'URL', 'image-url', 'Cuisine'], dtype=dtype_dict)

# Vectorizer with TF-IDF to reduce feature space & improve accuracy
tfidf = TfidfVectorizer(stop_words='english')

# Fit only once to avoid unnecessary memory usage
tfidf_matrix = tfidf.fit_transform(data['TranslatedRecipeName'].astype(str))

# Function to get recipe recommendations based on user input ingredients
def get_recipe_recommendations(leftover_ingredients):
    if not leftover_ingredients:
        return []

    # Convert user input into a sparse vector
    input_vector = tfidf.transform([leftover_ingredients.lower()])
    
    # Compute cosine similarity only for input
    cosine_sim = cosine_similarity(input_vector, tfidf_matrix).flatten()

    # Get top 10 recommendations using nlargest() instead of sorting all rows
    top_indices = cosine_sim.argsort()[-10:][::-1]
    
    recommendations = []
    for i in top_indices:
        recommendations.append([
            data.loc[i, 'TranslatedRecipeName'],  # Recipe Name
            data.loc[i, 'URL'],  # Recipe URL
            data.loc[i, 'image-url'],  # Recipe Image
            round(cosine_sim[i] * 100, 1)  # Similarity Score (converted to percentage)
        ])

    return recommendations

# Function to search for a recipe by name
def searchRecipe(query):
    if not query:
        return []

    # Convert query into a sparse vector
    query_vector = tfidf.transform([query.lower()])
    
    # Compute similarity only for the query
    cosine_sim = cosine_similarity(query_vector, tfidf_matrix).flatten()

    # Get top 10 similar recipes
    top_indices = cosine_sim.argsort()
    recipe_recommendations = data.iloc[top_indices][['TranslatedRecipeName', 'TranslatedInstructions', 'URL', 'image-url', 'Cuisine']].values.tolist()

    return recipe_recommendations
