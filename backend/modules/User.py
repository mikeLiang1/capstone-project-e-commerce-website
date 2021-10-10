from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='user')
db = firestore.client(default_app)

parser = reqparse.RequestParser()
parser.add_argument('uid', type=str, help='User ID required', required=True)
parser.add_argument('fname', type=str)
parser.add_argument('lname', type=str)
parser.add_argument('email', type=str)
parser.add_argument('password', type=str)
parser.add_argument('address', type=str)
parser.add_argument('purchaseHistory', type= list)

class User(Resource):
    
    # Get user info
    def get(self):
        
        args = parser.parse_args()
        doc_ref = db.collection(u'users').document(args.uid)

        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            return {"message": "User ID is not valid"}, 400
    
    # Update User Info
    def put(self):
        
        args = parser.parse_args()
        doc_ref = db.collection(u'users').document(args.uid)
        doc = doc_ref.get()
        if doc.exists is not True:
            return {'error': 'User ID is not valid'}, 404
            
        if args.fname != None:
            doc_ref.update({
                u'first': args.fname
            })
        
        if args.lname != None:
            doc_ref.update({
                u'last': args.lname
            })
        
        if args.email != None:
            doc_ref.update({
                u'email' : args.email
            })
        
        if args.address != None:
            doc_ref.update({
                u'adress' : args.address
            })
    
        if args.purchaseHistory != None:
            doc_ref.update({
                u'purchase history': args.purchaseHistory
            })

        return {'message' : 'User updated successfully'}
        