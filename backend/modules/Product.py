from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from firebase_admin import credentials, firestore, initialize_app

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='product')
db = firestore.client(default_app)

productParser = reqparse.RequestParser()
productParser.add_argument('name', type=str, help='Product name required', required=True)
productParser.add_argument('category', type=str)
productParser.add_argument('sub-category', type=str)
productParser.add_argument('image', type=list, help='Product image required', required=True)    # List because there can be multiple images
productParser.add_argument('price', type=float, help='Product price required', required=True)
productParser.add_argument('reviews', type=list)
productParser.add_argument('description', type=str, help='Product description required', required=True)
productParser.add_argument('tags', type=list) #required? or can just pass empty list?
productParser.add_argument('original_stock', type=int, help='Product original stock required', required=True)
productParser.add_argument('current_stock', type=int) #required?

class Product(Resource):
    # add product
    def post(self, product_id):
        # make abort_if_product_exists
        doc_ref = db.collection(u'products').document(product_id)   #?
        args = productParser.parse_args()
        doc_ref.set({
            u'name': args['name'],
            u'image': args['image'],
            u'price': args['price'],
            u'reviews': args['reviews'],
            u'description': args['description'],
            u'tags': args['tags'],
            u'original_stock': args['original_stock'],
            u'current_stock': args['current_stock']
        })

        return {"message" : "Product added successfully : {0}".format(args['name'])}