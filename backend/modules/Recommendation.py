from flask_restful import Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app
import pyrebase
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# Cosin similarity recommendation for product recommendations
# Refer to https://towardsdatascience.com/using-cosine-similarity-to-build-a-movie-recommendation-system-ae7f20842599
# https://stackoverflow.com/questions/55529775/uploading-json-to-firebase-from-dataframe

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='recommend')
db = firestore.client(default_app)

class Recommendation(Resource):
    
    # Returns a list of the most similar 15 product IDs
    def get(self, productID):
        # Read info from firebase
        productList = []
        
        values = db.collection('products').stream()
        
        for doc in values:
            d = doc.to_dict()
            d['id'] = doc.id
            productList.append(d)
        
        # Place data into dataframe
        df = pd.DataFrame(productList)
        
        print(df)
        
        def combinedFeatures(row):
            return row['category']+ " " + row['tag']
        
        df["combined_features"] = df.apply(combinedFeatures, axis=1)
        
        cv = CountVectorizer()
        count_matrix = cv.fit_transform(df["combined_features"])
        
        cosine_sim = cosine_similarity(count_matrix)
        
        print("Count Matrix:", count_matrix.toarray())
        
        def get_index_from_title(id):
            columns = list(df)
            
            for i,j in df.iterrows():
                print(j['id'])
                if j['id'] == id:
                    return i
        
        movie_index = get_index_from_title(productID)
        
        similar_products = list(enumerate(cosine_sim[movie_index]))
        
        sorted_similar_products = sorted(similar_products, key=lambda x:x[1], reverse=True)
        
        recommended = []

        i = 0
        for product in sorted_similar_products:
            
            print(df.iloc[product[0]]['id'])
            currentID = df.iloc[product[0]]['id']

            doc_ref = db.collection(u'products').document(currentID)
            doc = doc_ref.get()
            if doc.exists and doc.id != productID:
                print(doc.to_dict())
                recommended.append({"content": doc.to_dict(), "id": doc.id})
                    
            i += 1
            if i > 11:
                break

        return {"recommended_items": recommended}

        

