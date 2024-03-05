import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib



# to read a csv file which we have provided
data = pd.read_csv("final.csv")



# dropping a column which we have not required
data.drop(columns=[
 'TranslatedIngredients'], inplace=True)


# using a count vectorizer for collecting a words from input 
cv = CountVectorizer(stop_words='english')


# getting all the ingredients value
ingredients_matrix = cv.fit_transform(data['Cleaned-Ingredients'])
cosine_sim = cosine_similarity(ingredients_matrix)


# getting all the recipe names 
recipe = cv.fit_transform(data['TranslatedRecipeName'])
cosine_sim1 = cosine_similarity(recipe)



# function to get the related recipe name
def searchRecipe(query):
    if query is None:
        return []

    # Calculate cosine similarity for all recipes
    data['cosine_sim1'] = data['TranslatedRecipeName'].apply(lambda x: cosine_similarity(
        cv.transform([x.lower()]), cv.transform([query.lower()]))[0][0])
    
    sorted_df = data.sort_values('cosine_sim1', ascending=False).reset_index()
    recipr_recommendations = []

    # Iterate through all sorted recipes
    for i in range(len(sorted_df)):
        recipr_recommendations.append([
            i + 1,
            sorted_df.loc[i, 'TranslatedRecipeName'],
            sorted_df.loc[i, 'TranslatedInstructions'],
            sorted_df.loc[i, 'URL'],
            sorted_df.loc[i, 'image-url'],
            sorted_df.loc[i, 'Cuisine']
        ])

    return recipr_recommendations
    



# main function to check the input value to csv value
def get_recipe_recommendations(leftover_ingredients):
    if leftover_ingredients is None:
        return []
    # leftover_ingredients.replace(" ",",")
    leftover_list = leftover_ingredients.split(',')
    data['cosine_sim'] = data['TranslatedRecipeName'].apply(lambda x: cosine_similarity
                                                               (cv.transform([x]), cv.transform([leftover_ingredients]))[0][0])
    sorted_df = data.sort_values('cosine_sim', ascending=False).reset_index()
    recommendations = []
    for i in range(10):
        recommendations.append((i+1, sorted_df.loc[i, 'TranslatedRecipeName'], sorted_df.loc[i, 'cosine_sim'],sorted_df.loc[i,'URL'] , sorted_df.loc[i,'image-url']))
    return recommendations


# joblib.dump(cosine_sim, 'model1.joblib')
# ing = input("Enter the user required : ")
# print(get_recipe_recommendations(leftover_ingredients=ing))


# print(searchRecipe("pizza"))
