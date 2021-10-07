from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app
from firebase_admin import auth

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='register')
db = firestore.client(default_app)

registerParser = reqparse.RequestParser()
registerParser.add_argument('fname', type=str, help='First name required', required=True)
registerParser.add_argument('lname', type=str, help='Last name required', required=True)
registerParser.add_argument('email', type=str, help='Email required', required=True)
registerParser.add_argument('password', type=str, help='Password required', required=True)

class Register(Resource):
    def post(self):
        args = registerParser.parse_args()
        
        # TODO: Verify valid inputs
        
        user = auth.create_user(email = args.email, password = args.password, display_name = args.fname)
        
        # TODO: error handling
        
        # Put user information into database
        doc_ref = db.collection(u'users').document(user.uid)
        doc_ref.set({
            u'first': args.fname,
            u'last': args.lname,
            u'address': None,
            u'purchase history': [],
            u'admin': False
        })
        
        return {"message" : "User created succesffuly : {0}".format(user.uid)}