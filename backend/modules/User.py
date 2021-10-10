from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='user')
db = firestore.client(default_app)

parser = reqparse.RequestParser()
parser.add_argument('uid', type=str, help='User ID required', required=True)

class User(Resource):
    def get(self):
        
        args = parser.parse_args()
        doc_ref = db.collection(u'users').document(args.uid)


        if user_exists(doc_ref):
            return doc_ref.get().to_dict()
        else:
            return {"message": "User ID is not valid"}, 400
    
class User_add_productID(Resource):
    # given a productid, add to users purchase history
    def post(self, productID):
        args = parser.parse_args()
        doc_ref = db.collection(u'users').document(args.uid)

        if user_exists(doc_ref):
            doc_ref.update({u'purchase_history': firestore.ArrayUnion([productID])})

            return {"message": "Success"}

        else:
            return {"message": "User ID is not valid"}, 400


def user_exists(doc_ref):
    doc = doc_ref.get()
    return doc.exists