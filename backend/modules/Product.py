from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from firebase_admin import credentials, firestore, initialize_app

import pyrebase

'''
# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='product')
db = firestore.client(default_app)
'''

# Pyrebase
config = {
  "apiKey": "AIzaSyAVOqrvODx6KS-xBGs5guJTrKBJjduEjRI",
  "authDomain": "nocta-tech.firebaseapp.com",
  "databaseURL": "https://nocta-tech.firebaseio.com",
  "storageBucket": "nocta-tech.appspot.com",
  "serviceAccount": "key.json"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

productParser = reqparse.RequestParser()
productParser.add_argument('name', type=str, help='Product name required', required=True)
productParser.add_argument('category', type=str)
# productParser.add_argument('sub-category', type=str)
# productParser.add_argument('image', type=list, help='Product image required', required=True)    # List because there can be multiple images
productParser.add_argument('price', type=float, help='Product price required', required=True)
# productParser.add_argument('reviews', type=list)
productParser.add_argument('description', type=str, help='Product description required', required=True)
productParser.add_argument('tag', type=str) #required? or can just pass empty list?
productParser.add_argument('original_stock', type=int, help='Product original stock required', required=True)
productParser.add_argument('current_stock', type=int, help='Product current stock required', required=True)

class Product(Resource):
    def get(self, product_id):  # GET PRODUCT INFO
        # product = db.order_by_child('products').equal_to(product_id).limit_to_first(1).get().val()
        product = db.child('products').child(product_id).get().val()

        return {'message': 'Product retrieved successfully : {0}'.format(product)}

    def post(self, product_id): # ADD PRODUCT
        # make abort_if_product_exists
        '''
        doc_ref = db.collection(u'products').document(product_id)   #?
        args = productParser.parse_args()
        doc_ref.set({
            u'name': args.name,
            u'image': args.image,
            u'price': args.price,
            u'reviews': args.reviews,
            u'description': args.description,
            u'tags': args.tags,
            u'original_stock': args.original_stock,
            u'current_stock': args.current_stock
        })
        '''
        args = productParser.parse_args()
        data = {
            'name': args.name,
            'category': args.category,
            #'image': args.image,
            'price': args.price,
            #'reviews': args.reviews,
            'description': args.description,
            'tag': args.tag,
            'original_stock': args.original_stock,
            'current_stock': args.current_stock
        }
        db.child('products').child(product_id).set(data)

        return {'message' : 'Product added successfully : {0}'.format(args.name)}
    
    def put(self, product_id):  # EDIT PRODUCT
        args = productParser.parse_args()
        data = {
            'name': args.name,
            'category': args.category,
            #'image': args.image,
            'price': args.price,
            #'reviews': args.reviews,
            'description': args.description,
            'tag': args.tag,
            'original_stock': args.original_stock,
            'current_stock': args.current_stock
        }
        db.child('products').child(product_id).update(data)

        return {'message' : 'Product updated successfully : {0}'.format(args.name)}
    
    def delete(self, product_id):   # DELTE PRODUCT
        db.child('products').child(product_id).remove()

        # hmm maybe retrieve name from product id

        return {'message' : 'Product deleted successfully'}
