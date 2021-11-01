from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='explore')
db = firestore.client(default_app)

class Explore(Resource):

  # get list of items with given tag
  def get(self, tag):
    product_list = []
    docs = db.collection(u'products').stream()
    for doc in docs:
        # change all strings to lower case so that they can string match
        if(tag in doc.get('category').lower()):
          product_list.append({"content": doc.to_dict(), "id": doc.id})
        if(tag in doc.get('tag').lower()):
          product_list.append({"content": doc.to_dict(), "id": doc.id})

    return {'products': product_list}
