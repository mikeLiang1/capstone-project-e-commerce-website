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

        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            return {"message": "User ID is not valid"}, 400
    
    